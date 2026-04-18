import { BaseSkill } from 'opc-agent';
import type { AgentContext, Message, SkillResult } from 'opc-agent';
import type { AgentBrain } from 'deepbrain';

export class FAQSkill extends BaseSkill {
  name = 'faq';
  description = 'Answer FAQs using DeepBrain memory';
  private brain: AgentBrain | null;

  constructor(brain: AgentBrain | null) {
    super();
    this.brain = brain;
  }

  async execute(context: AgentContext, message: Message): Promise<SkillResult> {
    if (!this.brain) return this.noMatch();

    const faqKeywords = ['return', 'refund', 'shipping', 'delivery', 'payment', 'pay', 'warranty', 'hours', 'contact'];
    const isLikelyFAQ = faqKeywords.some(kw => message.content.toLowerCase().includes(kw));
    if (!isLikelyFAQ) return this.noMatch();

    try {
      const memories = await this.brain.recall(message.content);
      if (memories && memories.length > 0 && memories[0].score > 0.5) {
        const topResult = memories[0];
        const answer = (topResult as any).page?.compiled_truth || (topResult as any).chunk?.text || JSON.stringify(topResult);
        return this.match(answer);
      }
    } catch {
      // Fall through to LLM
    }
    return this.noMatch();
  }
}
