import { BaseSkill } from 'opc-agent';
import type { AgentContext, Message, SkillResult } from 'opc-agent';
import type { AgentBrain } from 'deepbrain';

export class FAQSkill extends BaseSkill {
  name = 'faq';
  description = 'Answer FAQs using DeepBrain memory';
  private brain: AgentBrain;

  constructor(brain: AgentBrain) {
    super();
    this.brain = brain;
  }

  async execute(context: AgentContext, message: Message): Promise<SkillResult> {
    // Check if this is a FAQ-like question
    const faqKeywords = ['return', 'refund', 'shipping', 'delivery', 'payment', 'pay', 'warranty', 'hours', 'contact'];
    const isLikelyFAQ = faqKeywords.some(kw => message.content.toLowerCase().includes(kw));

    if (!isLikelyFAQ) return this.noMatch();

    try {
      // Use AgentBrain.recall() to semantically search the knowledge base
      const memories = await this.brain.recall(message.content);
      if (memories && memories.length > 0 && memories[0].score > 0.5) {
        const topResult = memories[0];
        const answer = topResult.page?.compiled_truth || topResult.chunk?.text || JSON.stringify(topResult);

        // Learn from this interaction (the agent gets smarter over time)
        await this.brain.learn({
          action: `FAQ: ${message.content.slice(0, 50)}`,
          result: `Answered from memory`,
          context: { type: 'faq', query: message.content },
        });

        return this.match(`📋 ${answer}`);
      }
    } catch (e) {
      // Fall through to LLM if brain fails
    }

    return this.noMatch();
  }
}
