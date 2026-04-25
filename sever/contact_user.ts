import cloud from "@lafjs/cloud";

const db = cloud.database();

export async function main(ctx: FunctionContext) {
  const { password } = ctx.body;
  const ADMIN_PASSWORD = "123456"; // 您的管理员密码

  // 1. 权限校验
  if (password !== ADMIN_PASSWORD) {
    return { 
      ok: false, 
      error: "密码错误，拒绝访问" 
    };
  }

  try {
    // 2. 查询数据库中的留言集合（假设集合名为 'leads'）
    const { data: leads } = await db.collection("leads")
      .orderBy("createdAt", "desc") // 按创建时间倒序排
      .get();

    return {
      ok: true,
      data: leads,
      msg: "数据查询成功"
    };
  } catch (err) {
    return { 
      ok: false, 
      error: "数据库查询失败: " + err.message 
    };
  }
}