import cloud from "@lafjs/cloud";

const db = cloud.database();

/**
 * 提交需求/留言 云函数
 * 用于处理“联系我们”页面的表单提交
 */
export async function main(ctx: FunctionContext) {
  // 1. 从 ctx.body 中结构获取前端传来的字段
  const {
    intent,      // 咨询类型 (low/mid/high)
    name,        // 姓名
    company,     // 公司
    phone,       // 电话
    email,       // 邮箱 (选填)
    budget,      // 预算范围
    timeline,    // 计划启动时间
    requirement  // 需求描述
  } = ctx.body;

  // 2. 基础校验：确保必填项非空
  if (!name || !company || !phone) {
    return {
      ok: false,
      error: "姓名、公司和电话是必填项，请完善信息后再提交。"
    };
  }

  // 3. 构造数据对象
  const leadData = {
    intent,
    name,
    company,
    phone,
    email: email || '',
    budget,
    timeline,
    requirement: requirement || '',
    source: 'web_contact_page', // 来源标记
    createdAt: new Date(),      // 提交时间
    status: 'pending'           // 初始状态：待跟进
  };

  try {
    // 4. 将数据插入数据库集合 (集合名称建议为 leads 或 contacts)
    const { id } = await db.collection("leads").add(leadData);

    // 5. 返回成功信息
    return {
      ok: true,
      msg: '需求提交成功！我们的顾问会尽快与您联系。',
      data: { id }
    };
  } catch (error) {
    // 异常处理
    console.error('Submit Leaf Error:', error);
    return {
      ok: false,
      error: "服务器繁忙，请稍后再试或直接拨打我们的电话。"
    };
  }
}