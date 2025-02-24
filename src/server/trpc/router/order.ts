import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const orderRouter = createTRPCRouter({
  getOrders: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ input, ctx }) => {
      const { search, page, limit } = input;
      const skip = (page - 1) * limit;
      const where =
        search?.trim().length as any> 0
          ? ({
              OR: [
                { customerName: { contains: search, mode: "insensitive" } },
                { address: { contains: search, mode: "insensitive" } },
                { fulfillmentStatus: { contains: search, mode: "insensitive" } },
              ],
            } as import("@prisma/client").Prisma.OrderWhereInput)
          : {};

      const orders = await ctx.prisma.order.findMany({
        where,
        skip,
        take: limit,
        include: { orderLineItems: true },
        orderBy: { createdAt: "desc" },
      });
      const total = await ctx.prisma.order.count({ where });
      return { orders, total, page, limit };
    }),

  createOrder: publicProcedure
    .input(
      z.object({
        customerName: z.string(),
        address: z.string(),
        fulfillmentStatus: z.string(),
        orderLineItems: z.array(
          z.object({
            product: z.string(),
            quantity: z.number().min(1),
          })
        ),
      })
    )

    .mutation(async ({ input, ctx }) => {
      const { customerName, address, fulfillmentStatus, orderLineItems } = input;
      const order = await ctx.prisma.order.create({
        data: {
          customerName,
          address,
          fulfillmentStatus,
          orderLineItems: {
            create: orderLineItems,
          },
        },
      });
      return order;
    }),
    
    getOrderStats: publicProcedure.query(async ({ ctx }) => {
        const totalOrders = await ctx.prisma.order.count();
        const pendingOrders = await ctx.prisma.order.count({
          where: { fulfillmentStatus: "Pending" },
        });
        const deliveredOrders = await ctx.prisma.order.count({
          where: { fulfillmentStatus: "Delivered" },
        });
    
        return {
          totalOrders,
          pendingOrders,
          deliveredOrders,
        };
    })
});
