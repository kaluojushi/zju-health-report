const axios = require('axios');

const [cookie, dingtalk] = process.argv.slice(2);
const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36";
const baseURL = "https://healthreport.zju.edu.cn/ncov/wap/default/";
const dingtalkURL = "https://oapi.dingtalk.com/robot/send?access_token=" + dingtalk;

const instance = axios.create({
  baseURL,
  headers: {
    Cookie: `eai-sess=${cookie};`,
    "User-Agent": userAgent,
  }
});

async function get(url) {
  const res = await instance.get(url);
  if (res.status === 200) {
    return res.data;
  } else {
    throw new Error("网络错误");
  }
}

async function post(url, data) {
  const res = await instance.post(url, data, {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  });
  if (res.status === 200) {
    return res.data;
  } else {
    throw new Error("网络错误");
  }
}

async function dingtalkNotify(content) {
  try {
    await axios.post(dingtalkURL, {
      "msgtype": "text",
      "text": {
        "content": `每日填报：\n${content}`
      }
    });
  } catch (e) {
    console.log(e);
  }
}

function updateOldInfo(r, d) {
  if (d.jrdqtlqk) {
    d.jrdqtlqk = JSON.parse(d.jrdqtlqk);
  } else {
    d.jrdqtlqk = ["0"];
  }
  d.uid = r.uid;
  d.id = r.id;
  d.created = r.created;
  d.date = r.date;
  return getParams(d);
}

function getParams(obj) {
  const data = [];
  for (const key in obj) {
    const value = obj[key];
    if (Array.isArray(value)) {
      for (const k of value) {
        data.push(`${encodeURIComponent(key + "[]")}=${encodeURIComponent(k)}`);
      }
    } else {
      data.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }
  return data.join("&");
}

async function main() {
  try {
    if (!cookie) {
      if (dingtalk) {
        await dingtalkNotify("请填写 Cookie");
      }
      throw new Error("请填写 Cookie");
    }
    const html = await get("index");
    const defExec = /var def = ({.+?});\n/.exec(html);
    if (!defExec) {
      if (dingtalk) {
        await dingtalkNotify("请检查 Cookie 是否正确");
      }
      throw new Error("请检查 Cookie 是否正确");
    }
    const def = defExec[1];
    const oldInfoExec = /oldInfo: ({.+?}),\n/.exec(html);
    if (!oldInfoExec) {
      if (dingtalk) {
        await dingtalkNotify("请先手动打卡一次");
      }
      throw new Error("请先手动打卡一次");
    }
    const oldInfo = oldInfoExec[1];
    const r = JSON.parse(def), d = JSON.parse(oldInfo);
    const address = d.address;
    const data = updateOldInfo(r, d);
    const res = await post("save", data);
    const message = res.m;
    if (!message.includes("验证码")) {
      await dingtalkNotify(`${message}（无验证码）\n本次地址：${address}`);
      console.log(`每日填报：\n${message}（无验证码）\n本次地址：${address}`);
    } else {
      await dingtalkNotify(`${message}\n请手动打卡`);
      console.log(`每日填报：\n${message}\n请手动打卡`);
    }
  } catch (e) {
    console.log(e);
    await dingtalkNotify(`${e}`);
  }
}

main();
