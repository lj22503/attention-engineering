/**
 * 注意力工程 SaaS - 工作台交互脚本 v2
 * 纯前端动态生成方案（基于模板 + 用户输入）
 */

// 引擎切换
document.querySelectorAll('.engine-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    const engine = this.dataset.engine;
    document.querySelectorAll('.engine-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    document.querySelectorAll('.engine-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(`engine-${engine}`).classList.add('active');
  });
});

// URL 参数自动切换引擎
const urlParams = new URLSearchParams(window.location.search);
const engineType = urlParams.get('type');
if (engineType === 'protect') {
  document.querySelector('[data-engine="protect"]').click();
}

// 生成方案（动态生成）
function generatePlan(type) {
  const placeholder = document.getElementById(`output-placeholder-${type}`);
  const content = document.getElementById(`output-content-${type}`);
  
  placeholder.style.display = 'none';
  content.style.display = 'block';
  
  if (type === 'get') {
    renderGetPlan(content);
  } else {
    renderProtectPlan(content);
  }
  
  saveToHistory(type);
}

// 渲染获取注意力方案（动态生成）
function renderGetPlan(container) {
  const targetUser = document.getElementById('target-user').value || '未填写';
  const scenario = document.getElementById('scenario').value || '未选择';
  const product = document.getElementById('product').value || '未填写';
  const goal = document.getElementById('goal').value || '未填写';
  
  // 根据场景生成定制化钩子
  const scenarioHooks = getScenarioHooks(scenario);
  
  // 根据目标用户生成痛点
  const painPoints = generatePainPoints(targetUser);
  
  // 生成迁移成本文案
  const migrationCost = generateMigrationCost(product, goal);
  
  container.innerHTML = `
    <div class="output-card">
      <div class="output-card-title">场景匹配</div>
      <div class="output-card-content">
        <p><strong>目标用户：</strong>${targetUser}</p>
        <p><strong>场景类型：</strong>${scenario === '未选择' ? '自动推断' : getScenarioName(scenario)}</p>
        <p><strong>产品形态：</strong>${product}</p>
        <p><strong>核心目标：</strong>${goal}</p>
        <p style="margin-top: 12px; color: var(--accent);"><strong>→ ${getUserType(targetUser)}注意力设计</strong></p>
      </div>
    </div>
    
    <div class="output-card">
      <div class="output-card-title">能力放大器推演</div>
      <div class="output-card-content">
        <ul>
          <li><strong>Step 1 角色定位：</strong>${painPoints.userType}</li>
          <li><strong>Step 2 痛点临界：</strong>
            <ul style="margin-top: 4px; padding-left: 16px;">
              ${painPoints.points.map(p => `<li>${p}</li>`).join('')}
            </ul>
          </li>
          <li><strong>Step 3 差异化：</strong>${scenarioHooks.differentiation}</li>
          <li><strong>Step 4 交付形态：</strong>${scenarioHooks.delivery}</li>
        </ul>
      </div>
    </div>
    
    <div class="output-card">
      <div class="output-card-title">四子系统方案</div>
      <div class="output-card-content">
        <p><strong>1. 缺口制造 · 扎第一刀</strong></p>
        <ul>
          ${scenarioHooks.hooks.map(h => `<li>${h}</li>`).join('')}
        </ul>
        
        <p style="margin-top: 16px;"><strong>2. 唤醒锚定 · 产生紧迫感</strong></p>
        <ul>
          <li>成本类：${scenarioHooks.anchoring.cost}</li>
          <li>机会类：${scenarioHooks.anchoring.opportunity}</li>
          <li>安全类：${scenarioHooks.anchoring.safety}</li>
        </ul>
        
        <p style="margin-top: 16px;"><strong>3. 填补兑现 · 凭什么留下</strong></p>
        <ul>
          <li>框架：${scenarioHooks.fulfillment.framework}</li>
          <li>支点：${scenarioHooks.fulfillment.pivot}</li>
          <li>出口：${scenarioHooks.fulfillment.exit}</li>
        </ul>
        
        <p style="margin-top: 16px;"><strong>4. 迭代校准 · 下次更容易</strong></p>
        <ul>
          <li>开口率目标 >10% · 完成率 >70% · 返回率 >20%</li>
          <li>每周一 15 分钟复盘</li>
        </ul>
      </div>
    </div>
    
    <div class="output-card">
      <div class="output-card-title">迁移成本</div>
      <div class="output-card-content">
        <p>${migrationCost}</p>
        <p style="color: var(--accent);"><strong>离开 = 放弃这些积累</strong></p>
      </div>
    </div>
    
    <div class="output-card">
      <div class="output-card-title">下一步</div>
      <div class="output-card-content">
        <p>用钩子 1 写一篇内容，测试开口率</p>
      </div>
    </div>
    
    <div class="output-actions">
      <button class="btn-action" onclick="copyContent()">📋 复制</button>
      <button class="btn-action" onclick="savePlan()">💾 保存</button>
      <button class="btn-action" onclick="exportPDF()">📄 导出 PDF</button>
    </div>
  `;
}

// 渲染保护注意力方案（动态生成）
function renderProtectPlan(container) {
  const screenTime = document.querySelector('input[name="screen-time"]:checked')?.value || '4-6h';
  const anxietyItems = Array.from(document.querySelectorAll('input[name="anxiety"]:checked')).map(cb => cb.nextElementSibling.textContent);
  const focusProblem = document.getElementById('focus-problem').value || '未填写';
  
  // 根据屏幕时间生成诊断
  const diagnosis = getDiagnosis(screenTime, anxietyItems.length);
  
  // 根据焦虑来源生成陷阱识别
  const traps = generateTraps(anxietyItems);
  
  // 根据专注障碍生成边界设置
  const boundaries = generateBoundaries(focusProblem);
  
  container.innerHTML = `
    <div class="output-card">
      <div class="output-card-title">注意力诊断</div>
      <div class="output-card-content">
        <p><strong>屏幕时间：</strong>${screenTime}/天</p>
        <p><strong>焦虑来源：</strong>${anxietyItems.length > 0 ? anxietyItems.join('、') : '未选择'}</p>
        <p><strong>专注障碍：</strong>${focusProblem}</p>
        <p style="margin-top: 12px; color: var(--accent);"><strong>→ ${diagnosis}</strong></p>
      </div>
    </div>
    
    <div class="output-card">
      <div class="output-card-title">陷阱识别</div>
      <div class="output-card-content">
        <ul>
          ${traps.map(trap => `<li><strong>${trap.title}：</strong>${trap.desc}</li>`).join('')}
        </ul>
      </div>
    </div>
    
    <div class="output-card">
      <div class="output-card-title">边界设置</div>
      <div class="output-card-content">
        <ul>
          ${boundaries.map(b => `<li>${b}</li>`).join('')}
        </ul>
      </div>
    </div>
    
    <div class="output-card">
      <div class="output-card-title">主动分配</div>
      <div class="output-card-content">
        <ul>
          <li>每天 2h 深度工作（不看手机）</li>
          <li>每周 1 次"信息断食"（半天不看任何信息）</li>
          <li>每月 1 次"注意力审计"（看屏幕时间报告）</li>
        </ul>
      </div>
    </div>
    
    <div class="output-card">
      <div class="output-card-title">复盘模板</div>
      <div class="output-card-content">
        <ul>
          <li>本周屏幕时间：${getTargetScreenTime(screenTime)} → 目标 ${getReducedTime(screenTime)}</li>
          <li>专注时长：12h → 目标 >15h</li>
          <li>焦虑指数：7/10 → 目标 <5</li>
          <li>下周调整：${getAdjustment(anxietyItems)}</li>
        </ul>
      </div>
    </div>
    
    <div class="output-actions">
      <button class="btn-action" onclick="copyContent()">📋 复制</button>
      <button class="btn-action" onclick="savePlan()">💾 保存</button>
      <button class="btn-action" onclick="exportPDF()">📄 导出 PDF</button>
    </div>
  `;
}

// ========== 业务逻辑函数 ==========

// 根据场景获取钩子模板
function getScenarioHooks(scenario) {
  const hooksMap = {
    wechat: {
      hooks: [
        `你以为好内容自然有人看，但标题差 30% 没人点`,
        `你以为长文显得专业，但 5000 字读完率<5%`,
        `你以为日更是对的，但质量>频率`
      ],
      anchoring: {
        cost: `一篇没人看的文章，= 白写 8 小时`,
        opportunity: `同赛道的人已经在用缺口思维写标题`,
        safety: `不掌握注意力方法，永远依赖算法施舍`
      },
      fulfillment: {
        framework: `标题三要素（缺口 + 锚定 + 承诺）`,
        pivot: `5 个标题模板，直接套用`,
        exit: `标题写好了，下篇教你开头怎么留人`
      },
      differentiation: `帮她把"写作焦虑"变成"可执行的标题模板"`,
      delivery: `最小闭环 = 一个标题自检表（5 分钟写出好标题）`
    },
    xiaohongshu: {
      hooks: [
        `你以为封面好看就能爆，但 3 秒内抓不住重点就划走`,
        `你以为干货多就能火，但用户只记得住 1 个知识点`,
        `你以为日更就能涨粉，但方向错了越更越凉`
      ],
      anchoring: {
        cost: `一篇笔记没人看，= 白拍 50 张照片`,
        opportunity: `同赛道的爆款已经在用情绪钩子`,
        safety: `不懂小红书算法，发再多也是自嗨`
      },
      fulfillment: {
        framework: `爆款三要素（情绪 + 价值 + 行动）`,
        pivot: `3 个封面模板 + 5 个标题公式`,
        exit: `封面和标题有了，下篇教你怎么写正文`
      },
      differentiation: `帮她把"流量焦虑"变成"可复制的爆款公式"`,
      delivery: `最小闭环 = 一个爆款自检表（5 分钟诊断笔记）`
    },
    finance: {
      hooks: [
        `你以为定投能赚钱，但熊市会亏 30%`,
        `你以为长期持有是对的，但标的选错越亏越多`,
        `你以为分散投资能降低风险，但相关性太高=没分散`
      ],
      anchoring: {
        cost: `每月多花 200 元手续费，10 年就是 2.4 万`,
        opportunity: `别人已经在用 AI 做投资，你还在手动`,
        safety: `不懂就投，等于把钱包交给别人`
      },
      fulfillment: {
        framework: `投资四象限（风险×知识）`,
        pivot: `5 分钟风险偏好自测表`,
        exit: `知道了你的类型，下篇告诉你怎么配`
      },
      differentiation: `帮她把"投资焦虑"变成"可执行的动作"`,
      delivery: `最小闭环 = 一个自测表（5 分钟知道自己的风险偏好）`
    },
    default: {
      hooks: [
        `你以为 X 是对的，但如果你知道 Y，X 就不成立了`,
        `你以为 A 能带来 B，但实际上 C 才是关键`,
        `你以为大家都懂，但其实 90% 的人都错了`
      ],
      anchoring: {
        cost: `不掌握这个方法，每次都要从头开始`,
        opportunity: `同行已经在用系统化方法，你还在凭感觉`,
        safety: `没有可积累的方法论，永远在原地打转`
      },
      fulfillment: {
        framework: `核心框架（2x2 矩阵 / 3 类划分 / 4 个阶段）`,
        pivot: `可操作的检查清单 / 自测方法`,
        exit: `知道了 X 只是第一步，下篇我们会讲 Y`
      },
      differentiation: `帮她把"模糊焦虑"变成"可执行的动作"`,
      delivery: `最小闭环 = 一个自测表（5 分钟知道问题在哪）`
    }
  };
  
  return hooksMap[scenario] || hooksMap.default;
}

// 获取场景名称
function getScenarioName(scenario) {
  const names = {
    wechat: '公众号创作者',
    xiaohongshu: '小红书创作者',
    knowledge: '知识付费',
    ecommerce: '电商决策',
    finance: '金融投资',
    social: '社交社群',
    health: '健康习惯',
    saas: 'SaaS 工具'
  };
  return names[scenario] || '未选择';
}

// 根据目标用户生成用户类型
function getUserType(targetUser) {
  if (targetUser.includes('创作者') || targetUser.includes('运营') || targetUser.includes('产品')) {
    return '单层';
  } else if (targetUser.includes('理财师') || targetUser.includes('投顾') || targetUser.includes('老师')) {
    return '双层（传话者→终端用户）';
  }
  return '单层';
}

// 生成痛点
function generatePainPoints(targetUser) {
  const points = [
    '看到别人赚钱自己不会（高疼痛）',
    '买了产品不知道什么时候该用（极高疼痛）',
    '别人推荐的不适合自己（中疼痛）'
  ];
  
  if (targetUser.includes('理财') || targetUser.includes('投资')) {
    points[0] = '看到别人赚钱自己不会（高疼痛）';
    points[1] = '买了基金不知道什么时候该卖（极高疼痛）';
    points[2] = '理财顾问推荐的不适合自己（中疼痛）';
  }
  
  return {
    userType: '终端用户 → 单层注意力设计',
    points: points
  };
}

// 生成迁移成本
function generateMigrationCost(product, goal) {
  if (product.includes('社群')) {
    return '她的投资偏好数据 + 历史决策 + 社群互动记录';
  } else if (product.includes('课程')) {
    return '她的学习进度 + 练习记录 + 作业反馈';
  } else if (goal.includes('留存')) {
    return '她的使用习惯数据 + 历史决策 + 进化轨迹';
  }
  return '她的偏好数据 + 历史决策 + 进化轨迹';
}

// 获取诊断结果
function getDiagnosis(screenTime, anxietyCount) {
  if (screenTime === '6+' || anxietyCount >= 4) {
    return '信息焦虑型 · 极高唤醒状态';
  } else if (screenTime === '4-6' || anxietyCount >= 2) {
    return '信息焦虑型 · 高唤醒状态';
  } else if (screenTime === '2-4') {
    return '轻度焦虑 · 中等唤醒状态';
  }
  return '健康状态 · 低唤醒状态';
}

// 生成陷阱识别
function generateTraps(anxietyItems) {
  const traps = [];
  
  if (anxietyItems.includes('股市波动') || anxietyItems.includes('别人赚钱')) {
    traps.push({
      title: '社交比较',
      desc: '看到别人赚钱就焦虑，忍不住看盘'
    });
  }
  
  if (anxietyItems.includes('行业新闻') || anxietyItems.includes('怕错过信息')) {
    traps.push({
      title: '推送机制',
      desc: '每次打开就被算法"喂食"'
    });
    traps.push({
      title: 'FOMO',
      desc: '怕错过信息，结果被信息淹没'
    });
  }
  
  if (anxietyItems.includes('AI 焦虑')) {
    traps.push({
      title: '技术焦虑',
      desc: '怕被 AI 取代，疯狂学但用不上'
    });
  }
  
  if (traps.length === 0) {
    traps.push({
      title: '推送机制',
      desc: '每次打开就被算法"喂食"'
    });
    traps.push({
      title: 'FOMO',
      desc: '怕错过信息，结果被信息淹没'
    });
  }
  
  return traps;
}

// 生成边界设置
function generateBoundaries(focusProblem) {
  const boundaries = [
    '信息摄入时段：早 9 点 + 晚 8 点，各 30 分钟',
    '关闭非必要推送：保留核心，关闭噪音',
    '物理隔离：睡前手机放客厅，不用手机当闹钟'
  ];
  
  if (focusProblem.includes('阅读') || focusProblem.includes('学习')) {
    boundaries[1] = '关闭新闻推送，保留工作相关通知';
  }
  
  if (focusProblem.includes('工作') || focusProblem.includes('专注')) {
    boundaries.unshift('番茄工作法：25 分钟专注 + 5 分钟休息');
  }
  
  return boundaries;
}

// 获取目标屏幕时间
function getTargetScreenTime(current) {
  const hours = {
    '0-2': '2h',
    '2-4': '4h',
    '4-6': '6h',
    '6+': '8h'
  };
  return `本周${hours[current] || '4h'}`;
}

// 获取减少后的时间
function getReducedTime(current) {
  const targets = {
    '0-2': '<2h',
    '2-4': '<3h',
    '4-6': '<4h',
    '6+': '<5h'
  };
  return targets[current] || '<4h';
}

// 获取调整建议
function getAdjustment(anxietyItems) {
  if (anxietyItems.includes('股市波动')) {
    return '关闭股市推送，改为每天看 2 次';
  } else if (anxietyItems.includes('行业新闻')) {
    return '取消订阅低质量源，只看 3 个核心媒体';
  } else if (anxietyItems.includes('AI 焦虑')) {
    return '每周只学 1 个新工具，先把手头的用熟';
  }
  return '关闭非必要推送，改为主动搜索';
}

// 保存到历史
function saveToHistory(type) {
  const historyList = document.getElementById('history-list');
  const now = new Date();
  const dateStr = now.toLocaleString('zh-CN', { 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  const title = type === 'get' ? '获取注意力方案' : '保护注意力方案';
  
  if (historyList.querySelector('.history-empty')) {
    historyList.innerHTML = '';
  }
  
  const historyItem = document.createElement('div');
  historyItem.className = 'history-item';
  historyItem.innerHTML = `
    <span class="history-item-title">${title}</span>
    <span class="history-item-date">${dateStr}</span>
  `;
  
  historyList.insertBefore(historyItem, historyList.firstChild);
}

// 复制内容
function copyContent() {
  const content = document.querySelector('.output-content').innerText;
  navigator.clipboard.writeText(content).then(() => {
    alert('已复制到剪贴板');
  }).catch(() => {
    alert('复制失败，请手动选择复制');
  });
}

// 保存方案
function savePlan() {
  const content = document.querySelector('.output-content').innerHTML;
  localStorage.setItem('lastPlan', content);
  alert('已保存到本地');
}

// 导出 PDF
function exportPDF() {
  alert('PDF 导出功能开发中...');
}

// 页面加载动画
document.querySelectorAll('.input-section, .output-section').forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  
  setTimeout(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 100);
});
