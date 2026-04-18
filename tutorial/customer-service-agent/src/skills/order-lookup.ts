import { BaseSkill } from 'opc-agent';
import type { AgentContext, Message, SkillResult } from 'opc-agent';

// Simulated order database
const ORDERS: Record<string, { status: string; items: string; date: string; total: string }> = {
  'ORD-12345': { status: 'Shipped', items: 'Wireless Headphones x1', date: '2024-03-15', total: '$89.99' },
  'ORD-12346': { status: 'Processing', items: 'USB-C Hub x2', date: '2024-03-18', total: '$45.98' },
  'ORD-12347': { status: 'Delivered', items: 'Mechanical Keyboard x1', date: '2024-03-10', total: '$159.00' },
};

export class OrderLookupSkill extends BaseSkill {
  name = 'order-lookup';
  description = 'Look up customer orders by order ID';

  async execute(context: AgentContext, message: Message): Promise<SkillResult> {
    const match = message.content.match(/\b(ORD-\d+)\b/i) ||
                  message.content.match(/\/order\s+(\S+)/i);

    if (!match) return this.noMatch();

    const orderId = match[1].toUpperCase();
    const order = ORDERS[orderId];

    if (!order) {
      return this.match(`❌ Order ${orderId} not found. Please check the order ID and try again.`);
    }

    return this.match(
      `📦 **Order ${orderId}**\n` +
      `├ Status: ${order.status}\n` +
      `├ Items: ${order.items}\n` +
      `├ Date: ${order.date}\n` +
      `└ Total: ${order.total}`
    );
  }
}
