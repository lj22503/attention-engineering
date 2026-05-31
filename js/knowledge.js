/**
 * 万有注意力 SaaS - 知识库交互脚本
 * 分类切换 + 文章弹窗
 */

// 文章数据
const articles = {
  theory: {
    'attention-economy': {
      title: '《注意力经济》核心框架',
      tag: '经典理论',
      content: `
        <div class="article-intro">Michael H. Goldhaber 在 1997 年提出：<strong>信息越丰富，注意力越匮乏。</strong></div>
        
        <div class="article-section">
          <h3>核心洞察</h3>
          <p>信息时代的稀缺资源不是信息，而是处理信息的注意力。每增加一条信息，就分散一份注意力。</p>
        </div>
        
        <div class="article-section">
          <h3>注意力收割循环</h3>
          <p>缺口制造 → 唤醒锚定 → 填补兑现 → 迭代校准。四步闭环，自运转。</p>
        </div>
        
        <div class="article-section">
          <h3>对你的启示</h3>
          <p>不要和 1000 个创作者抢注意力。找到你的 100 个铁杆粉丝，用闭环留住他们。</p>
        </div>
      `
    },
    'fogg-behavior': {
      title: '福格行为模型 B=MAP',
      tag: '行为科学',
      content: `
        <div class="article-intro">B.J. Fogg 提出：<strong>行为 = 动机 × 能力 × 提示。</strong>三者缺一，行为不会发生。</div>
        
        <div class="article-section">
          <h3>三要素拆解</h3>
          <p><strong>动机（Motivation）：</strong>用户想做这件事的意愿。缺口制造就是提升动机。</p>
          <p><strong>能力（Ability）：</strong>用户能做这件事的门槛。门槛越低，行为越容易发生。</p>
          <p><strong>提示（Prompt）：</strong>触发行为的信号。没有提示，动机和能力都是零。</p>
        </div>
        
        <div class="article-section">
          <h3>实战应用</h3>
          <p>如果你的内容没人点 → 动机不够（缺口不够扎）</p>
          <p>如果点了没人看 → 能力不够（内容太难/太长）</p>
          <p>如果看了没行动 → 提示不够（没有明确的行动召唤）</p>
        </div>
      `
    },
    'peak-end': {
      title: '峰终定律',
      tag: '心理学',
      content: `
        <div class="article-intro">Daniel Kahneman 发现：<strong>人对体验的记忆 = 峰值 + 终值。</strong>过程长短不重要。</div>
        
        <div class="article-section">
          <h3>核心原理</h3>
          <p>一段 30 分钟的痛苦体验，如果结尾不那么痛苦，回忆起来比 15 分钟但结尾更痛苦的体验"更好"。</p>
        </div>
        
        <div class="article-section">
          <h3>注意力应用</h3>
          <p>1. 开头制造"峰值"：用缺口钩子抓住注意力</p>
          <p>2. 中间保持"价值密度"：每 200 字一个亮点</p>
          <p>3. 结尾设计"终值"：用行动召唤或金句收尾</p>
        </div>
      `
    },
    'thinking-fast-slow': {
      title: '系统 1 / 系统 2',
      tag: '认知科学',
      content: `
        <div class="article-intro">Kahneman  Nobel 奖理论：<strong>大脑有两套系统。快思考（直觉）vs 慢思考（理性）。</strong></div>
        
        <div class="article-section">
          <h3>系统 1（快思考）</h3>
          <p>自动、快速、无意识、情绪驱动。占日常决策的 95%。注意力捕获主要作用于系统 1。</p>
        </div>
        
        <div class="article-section">
          <h3>系统 2（慢思考）</h3>
          <p>费力、缓慢、有意识、逻辑驱动。启动成本高。转化和留存需要系统 2。</p>
        </div>
        
        <div class="article-section">
          <h3>实战策略</h3>
          <p>用系统 1 抓注意力（标题、封面、开头）→ 用系统 2 做转化（数据、逻辑、案例）。</p>
        </div>
      `
    },
    'habit-loop': {
      title: '习惯回路 & 习惯四定律',
      tag: '习惯科学',
      content: `
        <div class="article-intro">Charles Duhigg + James Clear：<strong>提示→渴望→反应→奖赏。如何让注意力行为变成习惯。</strong></div>
        
        <div class="article-section">
          <h3>习惯回路</h3>
          <p><strong>提示：</strong>触发行为的信号（推送通知、时间到了）</p>
          <p><strong>渴望：</strong>对奖赏的期待（想知道发生了什么）</p>
          <p><strong>反应：</strong>实际行为（打开 App、点击链接）</p>
          <p><strong>奖赏：</strong>满足渴望（获得信息、娱乐）</p>
        </div>
        
        <div class="article-section">
          <h3>设计习惯</h3>
          <p>1. 让它显而易见（提示）</p>
          <p>2. 让它有吸引力（渴望）</p>
          <p>3. 让它简便易行（反应）</p>
          <p>4. 让它令人愉悦（奖赏）</p>
        </div>
      `
    },
    'ux-laws': {
      title: '12 条用户体验定律',
      tag: '设计原则',
      content: `
        <div class="article-intro">设计即注意力管理。12 条定律帮你减少认知负担，提升注意力效率。</div>
        
        <div class="article-section">
          <h3>核心定律</h3>
          <p><strong>Jakob's Law：</strong>用户按其他网站的经验使用你的网站。不要创新，要熟悉。</p>
          <p><strong>Hick's Law：</strong>选项越多，决策越慢。限制选择 = 提升转化。</p>
          <p><strong>Miller's Law：</strong>人脑一次只能处理 7±2 个信息块。分组、简化。</p>
          <p><strong>Aesthetic-Usability Effect：</strong>好看 = 好用。视觉吸引力影响耐心。</p>
        </div>
      `
    },
    'biases': {
      title: '9 类决策偏差',
      tag: '决策科学',
      content: `
        <div class="article-intro">确认偏误、锚定效应、损失厌恶… <strong>注意力如何被偏差利用。</strong></div>
        
        <div class="article-section">
          <h3>常见偏差</h3>
          <p><strong>锚定效应：</strong>第一个信息影响后续判断。标题数字就是锚。</p>
          <p><strong>损失厌恶：</strong>失去的痛 = 得到的快乐的 2 倍。用"损失"比用"收益"更抓注意力。</p>
          <p><strong>社会认同：</strong>别人都在做 = 我也要做。从众心理是最强钩子之一。</p>
          <p><strong>稀缺效应：</strong>越少越想要。限时、限量、独家。</p>
        </div>
      `
    },
    'user-mental-model': {
      title: '用户心智模型',
      tag: '产品心理学',
      content: `
        <div class="article-intro"><strong>用户不是按你的逻辑思考，而是按他们的经验判断。</strong></div>
        
        <div class="article-section">
          <h3>心智模型 vs 实现模型</h3>
          <p>你设计产品用的是实现模型（功能、逻辑、架构）。用户用的是心智模型（经验、直觉、类比）。</p>
        </div>
        
        <div class="article-section">
          <h3>注意力应用</h3>
          <p>用用户的语言，不用你的术语。用类比，不用解释。用故事，不用数据。</p>
        </div>
      `
    },
    'attention-closed-loop': {
      title: '注意力闭环：捕获→转化→留存',
      tag: '方法论',
      content: `
        <div class="article-intro"><strong>万有注意力核心方法论：四步闭环，自运转。</strong></div>
        
        <div class="article-section">
          <h3>四步闭环</h3>
          <p><strong>01 缺口制造：</strong>扎第一刀。制造"不知道"的不适感。</p>
          <p><strong>02 唤醒锚定：</strong>产生紧迫感。成本/机会/安全三选一。</p>
          <p><strong>03 填补兑现：</strong>凭什么留下。框架+支点+出口。</p>
          <p><strong>04 迭代校准：</strong>下次更容易。开口率/完成率/返回率。</p>
        </div>
        
        <div class="article-section">
          <h3>闭环自运转</h3>
          <p>第四步的"返回"就是第一步的"缺口"。闭环一旦启动，不需要持续投入注意力。</p>
        </div>
      `
    }
  },
  cases: {},
  tools: {}
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
  // Tab 切换
  document.querySelectorAll('.knowledge-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const category = this.dataset.category;
      document.querySelectorAll('.knowledge-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      document.querySelectorAll('.knowledge-grid').forEach(g => g.classList.remove('active'));
      document.getElementById(`knowledge-${category}`).classList.add('active');
    });
  });
  
  // 点击弹窗外部关闭
  document.getElementById('modal-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
      closeArticle();
    }
  });
  
  // ESC 键关闭
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeArticle();
    }
  });
});

// 打开文章
function openArticle(category, id) {
  const article = articles[category]?.[id];
  if (!article) {
    // 文章尚未编写，显示占位内容
    document.getElementById('modal-body').innerHTML = `
      <div class="modal-header">
        <div class="modal-title">📖 内容开发中</div>
        <div class="modal-subtitle">这篇文章正在撰写，敬请期待</div>
      </div>
      <div class="modal-section">
        <div class="modal-section-content">
          <p>我们正在整理注意力工程的理论框架和实战案例。</p>
          <p style="margin-top: 16px;">如果你有兴趣贡献内容，欢迎联系燃冰。</p>
        </div>
      </div>
    `;
  } else {
    document.getElementById('modal-body').innerHTML = `
      <div class="modal-header">
        <div class="modal-title">${article.title}</div>
        <div class="modal-subtitle">${article.tag}</div>
      </div>
      ${article.content}
    `;
  }
  
  document.getElementById('modal-overlay').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// 关闭文章
function closeArticle() {
  document.getElementById('modal-overlay').style.display = 'none';
  document.body.style.overflow = '';
}
