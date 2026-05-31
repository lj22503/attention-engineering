/**
 * 注意力工程 SaaS - 场景库交互脚本
 * 14 大场景数据 + 动态生成 + 弹窗交互
 */

// 场景数据
const scenarios = {
  get: [
    {
      id: 'wechat',
      icon: '📝',
      title: '公众号创作者',
      pain: '写了没人看？读完率低？',
      product: '公众号、头条号、百家号',
      hooks: [
        '你以为好内容自然有人看，但标题差 30% 没人点',
        '你以为长文显得专业，但 5000 字读完率<5%',
        '你以为日更是对的，但质量>频率'
      ],
      anchoring: {
        cost: '一篇没人看的文章，= 白写 8 小时',
        opportunity: '同赛道的人已经在用缺口思维写标题',
        safety: '不掌握注意力方法，永远依赖算法施舍'
      },
      fulfillment: {
        framework: '标题三要素（缺口 + 锚定 + 承诺）',
        pivot: '5 个标题模板，直接套用',
        exit: '标题写好了，下篇教你开头怎么留人'
      },
      case: {
        title: '从 0 到 10 万阅读，我只做了一件事',
        openRate: '18%',
        completeRate: '72%',
        returnRate: '25%'
      }
    },
    {
      id: 'xiaohongshu',
      icon: '📕',
      title: '小红书创作者',
      pain: '流量不稳定？爆款难复制？',
      product: '小红书、抖音、快手',
      hooks: [
        '你以为封面好看就能爆，但 3 秒内抓不住重点就划走',
        '你以为干货多就能火，但用户只记得住 1 个知识点',
        '你以为日更就能涨粉，但方向错了越更越凉'
      ],
      anchoring: {
        cost: '一篇笔记没人看，= 白拍 50 张照片',
        opportunity: '同赛道的爆款已经在用情绪钩子',
        safety: '不懂小红书算法，发再多也是自嗨'
      },
      fulfillment: {
        framework: '爆款三要素（情绪 + 价值 + 行动）',
        pivot: '3 个封面模板 + 5 个标题公式',
        exit: '封面和标题有了，下篇教你怎么写正文'
      },
      case: {
        title: '从 0 到 1 万粉，我的爆款公式',
        openRate: '22%',
        completeRate: '68%',
        returnRate: '30%'
      }
    },
    {
      id: 'knowledge',
      icon: '🎓',
      title: '知识付费',
      pain: '完课率低？转化难？',
      product: '课程、训练营、社群',
      hooks: [
        '你以为内容好就能卖，但用户根本看不到',
        '你以为低价就能转化，但便宜=没价值',
        '你以为用户会坚持，但完课率不到 20%'
      ],
      anchoring: {
        cost: '一门课没人买，= 白录 50 小时',
        opportunity: '同行已经在用注意力方法做营销',
        safety: '没有注意力策略，永远在打价格战'
      },
      fulfillment: {
        framework: '营销四步曲（注意→兴趣→欲望→行动）',
        pivot: '课程销售页自检表',
        exit: '销售页优化好了，下篇教你做转化'
      },
      case: {
        title: '完课率从 20% 提升到 65% 的秘密',
        openRate: '15%',
        completeRate: '65%',
        returnRate: '40%'
      }
    },
    {
      id: 'ecommerce',
      icon: '🛒',
      title: '电商决策',
      pain: '犹豫流失，不付款？',
      product: '电商平台、直播带货',
      hooks: [
        '你以为降价就能卖，但用户还是不付款',
        '你以为详情够详细，但用户 3 秒就划走',
        '你以为好评多就能转化，但用户还是犹豫'
      ],
      anchoring: {
        cost: '一个流失的客户，= 损失 300 元 LTV',
        opportunity: '竞品已经在用注意力优化详情页',
        safety: '不懂注意力，流量再贵也得买'
      },
      fulfillment: {
        framework: '转化三要素（信任 + 紧迫 + 行动）',
        pivot: '详情页优化清单',
        exit: '详情页优化了，下篇教你做复购'
      },
      case: {
        title: '转化率从 2% 提升到 5% 的实战',
        openRate: '25%',
        completeRate: '60%',
        returnRate: '35%'
      }
    },
    {
      id: 'finance',
      icon: '💰',
      title: '金融投资',
      pain: '情绪驱动，不学习？',
      product: '基金 App、投顾服务、理财社区',
      hooks: [
        '你以为定投能赚钱，但熊市会亏 30%',
        '你以为长期持有是对的，但标的选错越亏越多',
        '你以为分散投资能降低风险，但相关性太高=没分散'
      ],
      anchoring: {
        cost: '每月多花 200 元手续费，10 年就是 2.4 万',
        opportunity: '别人已经在用 AI 做投资，你还在手动',
        safety: '不懂就投，等于把钱包交给别人'
      },
      fulfillment: {
        framework: '投资四象限（风险×知识）',
        pivot: '5 分钟风险偏好自测表',
        exit: '知道了你的类型，下篇告诉你怎么配'
      },
      case: {
        title: '从韭菜到稳定盈利，我只用了这个方法',
        openRate: '20%',
        completeRate: '70%',
        returnRate: '45%'
      }
    },
    {
      id: 'social',
      icon: '👥',
      title: '社交社群',
      pain: '潜水多，发言少？',
      product: '微信群、Discord、知识星球',
      hooks: [
        '你以为建群就能活跃，但 90% 的人潜水',
        '你以为发红包就能互动，但红包发完就沉默',
        '你以为话题够好，但没人接话'
      ],
      anchoring: {
        cost: '一个死群，= 浪费了 500 个精准用户',
        opportunity: '别人的社群每天 999+，你的死气沉沉',
        safety: '不懂社群注意力运营，建再多也是死群'
      },
      fulfillment: {
        framework: '社群活跃三要素（触发 + 行动 + 奖赏）',
        pivot: '社群运营日历模板',
        exit: '社群活跃了，下篇教你做转化'
      },
      case: {
        title: '从死群到日活 60%，我做了这 3 件事',
        openRate: '30%',
        completeRate: '55%',
        returnRate: '50%'
      }
    },
    {
      id: 'health',
      icon: '💪',
      title: '健康习惯',
      pain: '初期热情高，很快放弃？',
      product: '健身 App、冥想 App、戒烟社区',
      hooks: [
        '你以为办卡就能坚持，但去了 3 次就不去了',
        '你以为靠意志力就能戒，但 3 天就复发',
        '你以为跟着练就能瘦，但一周就放弃'
      ],
      anchoring: {
        cost: '一张健身卡，= 白扔 3000 元',
        opportunity: '别人已经在用习惯设计坚持',
        safety: '不懂注意力习惯，永远在办卡 - 放弃循环'
      },
      fulfillment: {
        framework: '习惯养成四定律（提示→渴望→反应→奖赏）',
        pivot: '21 天习惯追踪表',
        exit: '习惯养成了，下篇教你做进阶'
      },
      case: {
        title: '从 3 天放弃到坚持 100 天，我的方法',
        openRate: '28%',
        completeRate: '62%',
        returnRate: '55%'
      }
    },
    {
      id: 'saas',
      icon: '💻',
      title: 'SaaS 工具',
      pain: '注册后流失，不知道从哪开始？',
      product: '协作工具、CRM、数据分析平台',
      hooks: [
        '你以为功能多就能留住，但用户根本不知道从哪开始',
        '你以为引导够详细，但用户还是找不到北',
        '你以为免费试用就能转化，但 90% 注册后就不用了'
      ],
      anchoring: {
        cost: '一个流失的用户，= 损失 999 元年费',
        opportunity: '竞品已经在用注意力优化 onboarding',
        safety: '不懂注意力设计，获客再贵也得买'
      },
      fulfillment: {
        framework: '用户引导三要素（目标→行动→反馈）',
        pivot: 'Onboarding 流程自检表',
        exit: '引导优化了，下篇教你做留存'
      },
      case: {
        title: '从 10% 到 40% 激活率，我们做了什么',
        openRate: '18%',
        completeRate: '75%',
        returnRate: '40%'
      }
    }
  ],
  protect: [
    {
      id: 'info-anxiety',
      icon: '😰',
      title: '信息焦虑',
      pain: '不看就慌，看了更慌',
      traps: [
        '推送机制：每次打开就被算法"喂食"',
        'FOMO：怕错过信息，结果被信息淹没',
        '信息囤积：收藏=学会，实际上再也没看过'
      ],
      boundaries: [
        '信息摄入时段：早 9 点 + 晚 8 点，各 30 分钟',
        '关闭非必要推送：保留核心，关闭噪音',
        '物理隔离：睡前手机放客厅，不用手机当闹钟'
      ],
      allocation: [
        '每天 2h 深度工作（不看手机）',
        '每周 1 次"信息断食"（半天）',
        '每月 1 次"注意力审计"（看屏幕时间报告）'
      ]
    },
    {
      id: 'phone-addiction',
      icon: '📱',
      title: '刷手机上瘾',
      pain: '打开就停不下来',
      traps: [
        '无限滚动：永远刷不到底',
        '随机奖励：不知道下一条是什么',
        '社交压力：怕错过别人的动态'
      ],
      boundaries: [
        '设置使用时限：每天不超过 2 小时',
        '删除上瘾 App：抖音、微博、小红书',
        '用功能机替代：只保留通话和微信'
      ],
      allocation: [
        '每天 1h 阅读纸质书',
        '每周 1 次户外活动（不带手机）',
        '每月 1 次"数字排毒"（周末不用手机）'
      ]
    },
    {
      id: 'attention-fragment',
      icon: '🧩',
      title: '注意力碎片化',
      pain: '无法专注超过 15 分钟',
      traps: [
        '多任务处理：同时做好几件事',
        '频繁切换：每 5 分钟看一次手机',
        '浅层工作：只做不需要深度思考的事'
      ],
      boundaries: [
        '番茄工作法：25 分钟专注 + 5 分钟休息',
        '关闭所有通知：工作时段免打扰',
        '单一任务：一次只做一件事'
      ],
      allocation: [
        '每天 2h 深度工作（上午最佳时段）',
        '每周 1 次"无会议日"',
        '每月 1 次"深度工作周"'
      ]
    },
    {
      id: 'decision-fatigue',
      icon: '😫',
      title: '决策疲劳',
      pain: '每天做太多小决定',
      traps: [
        '选择过多：每天面对无数选择',
        '完美主义：总想做出最优决定',
        '信息过载：做决定前要看太多资料'
      ],
      boundaries: [
        '固定决策时间：每天只在固定时段做决定',
        '减少选项：限制选择范围到 3 个以内',
        '委托他人：把不重要的决定交给别人'
      ],
      allocation: [
        '重要决定放在上午（精力最好时）',
        '每周复盘决策质量',
        '每月清理决策清单'
      ]
    },
    {
      id: 'info-overload',
      icon: '📚',
      title: '信息过载',
      pain: '收藏=学会，再也没看',
      traps: [
        '囤积癖：看到有用的就收藏',
        '学习焦虑：怕跟不上时代',
        '松鼠症：存了等于学了'
      ],
      boundaries: [
        '输入限额：每天只读 1 篇文章',
        '取消订阅：取关 80% 的公众号',
        '定期清理：每月删除未读收藏'
      ],
      allocation: [
        '每天 30 分钟深度阅读（精读 1 篇）',
        '每周输出 1 篇笔记（强制内化）',
        '每月实践 1 个知识点'
      ]
    },
    {
      id: 'attention-economy',
      icon: '💸',
      title: '注意力经济',
      pain: '被算法"喂食"',
      traps: [
        '推荐算法：只看算法推给你的',
        '信息茧房：越来越窄的视野',
        '被动接收：失去主动选择能力'
      ],
      boundaries: [
        '主动搜索：不用推荐，自己找信息',
        '多元来源：关注不同立场的媒体',
        '定期反思：我为什么看这个？'
      ],
      allocation: [
        '每天 30 分钟主动学习（而非被动刷）',
        '每周探索 1 个新领域',
        '每月做 1 次"信息食谱"审计'
      ]
    }
  ]
};

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
  renderScenarios('get');
  renderScenarios('protect');
  
  // Tab 切换
  document.querySelectorAll('.scenario-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const type = this.dataset.type;
      document.querySelectorAll('.scenario-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      document.querySelectorAll('.scenario-grid').forEach(g => g.classList.remove('active'));
      document.getElementById(`scenario-${type}`).classList.add('active');
    });
  });
  
  // 点击弹窗外部关闭
  document.getElementById('modal-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
      closeModal();
    }
  });
  
  // ESC 键关闭弹窗
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});

// 渲染场景卡片
function renderScenarios(type) {
  const container = document.getElementById(`scenario-${type}`);
  const scenarioList = scenarios[type];
  
  container.innerHTML = scenarioList.map(scenario => `
    <div class="scenario-card" onclick="openModal('${type}', '${scenario.id}')">
      <div class="scenario-card-icon">${scenario.icon}</div>
      <div class="scenario-card-title">${scenario.title}</div>
      <div class="scenario-card-pain">${scenario.pain}</div>
      <div class="scenario-card-preview">
        <strong>${type === 'get' ? '缺口钩子' : '陷阱识别'}</strong>：
        ${type === 'get' ? scenario.hooks.length : scenario.traps.length} 个预设方案
      </div>
    </div>
  `).join('');
}

// 打开弹窗
function openModal(type, id) {
  const scenario = scenarios[type].find(s => s.id === id);
  if (!scenario) return;
  
  const modalBody = document.getElementById('modal-body');
  
  if (type === 'get') {
    modalBody.innerHTML = `
      <div class="modal-header">
        <div class="modal-title">${scenario.icon} ${scenario.title}</div>
        <div class="modal-subtitle">${scenario.product}</div>
      </div>
      
      <div class="modal-section">
        <div class="modal-section-title">核心痛点</div>
        <div class="modal-section-content">${scenario.pain}</div>
      </div>
      
      <div class="modal-section">
        <div class="modal-section-title">缺口钩子（3 个）</div>
        <div class="modal-section-content">
          <ul>
            ${scenario.hooks.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>
      </div>
      
      <div class="modal-section">
        <div class="modal-section-title">唤醒锚定</div>
        <div class="modal-section-content">
          <ul>
            <li><strong>成本类：</strong>${scenario.anchoring.cost}</li>
            <li><strong>机会类：</strong>${scenario.anchoring.opportunity}</li>
            <li><strong>安全类：</strong>${scenario.anchoring.safety}</li>
          </ul>
        </div>
      </div>
      
      <div class="modal-section">
        <div class="modal-section-title">填补兑现</div>
        <div class="modal-section-content">
          <ul>
            <li><strong>框架：</strong>${scenario.fulfillment.framework}</li>
            <li><strong>支点：</strong>${scenario.fulfillment.pivot}</li>
            <li><strong>出口：</strong>${scenario.fulfillment.exit}</li>
          </ul>
        </div>
      </div>
      
      <div class="modal-section">
        <div class="modal-section-title">案例数据</div>
        <div class="modal-section-content">
          <p><strong>${scenario.case.title}</strong></p>
          <p>开口率 ${scenario.case.openRate} · 完成率 ${scenario.case.completeRate} · 返回率 ${scenario.case.returnRate}</p>
        </div>
      </div>
      
      <div class="modal-actions">
        <button class="btn-use" onclick="useScenario('${type}', '${scenario.id}')">🎯 用这个方案</button>
        <button class="btn-custom" onclick="customScenario('${type}', '${scenario.id}')">✏️ 自定义</button>
      </div>
    `;
  } else {
    modalBody.innerHTML = `
      <div class="modal-header">
        <div class="modal-title">${scenario.icon} ${scenario.title}</div>
        <div class="modal-subtitle">${scenario.pain}</div>
      </div>
      
      <div class="modal-section">
        <div class="modal-section-title">陷阱识别</div>
        <div class="modal-section-content">
          <ul>
            ${scenario.traps.map(t => `<li>${t}</li>`).join('')}
          </ul>
        </div>
      </div>
      
      <div class="modal-section">
        <div class="modal-section-title">边界设置</div>
        <div class="modal-section-content">
          <ul>
            ${scenario.boundaries.map(b => `<li>${b}</li>`).join('')}
          </ul>
        </div>
      </div>
      
      <div class="modal-section">
        <div class="modal-section-title">主动分配</div>
        <div class="modal-section-content">
          <ul>
            ${scenario.allocation.map(a => `<li>${a}</li>`).join('')}
          </ul>
        </div>
      </div>
      
      <div class="modal-actions">
        <button class="btn-use" onclick="useScenario('${type}', '${scenario.id}')">🛡️ 用这个方案</button>
        <button class="btn-custom" onclick="customScenario('${type}', '${scenario.id}')">✏️ 自定义</button>
      </div>
    `;
  }
  
  document.getElementById('modal-overlay').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// 关闭弹窗
function closeModal() {
  document.getElementById('modal-overlay').style.display = 'none';
  document.body.style.overflow = '';
}

// 使用方案（跳转到工作台）
function useScenario(type, id) {
  const scenario = scenarios[type].find(s => s.id === id);
  if (!scenario) return;
  
  // 保存场景数据到 localStorage
  localStorage.setItem('selectedScenario', JSON.stringify({
    type: type,
    id: id,
    title: scenario.title,
    pain: scenario.pain
  }));
  
  // 跳转到工作台
  window.location.href = `workbench.html?type=${type}&scenario=${id}`;
}

// 自定义方案
function customScenario(type, id) {
  // 关闭弹窗
  closeModal();
  // 跳转到工作台
  window.location.href = `workbench.html?type=${type}`;
}
