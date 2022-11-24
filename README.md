# zju-health-report

> 遇到 `Error: 请检查 Cookie 是否正确` 的，请更新项目！——2022.11.24

浙江大学自动打卡（基于 axios），只需 fork 并简单配置即可。

如果项目对你有帮助，欢迎 star ！

项目地址：[zju-health-report](https://github.com/kaluojushi/zju-health-report)

项目说明点击 [这里](#项目说明)

更新说明点击 [这里](#更新说明)

## 使用方法

首先你需要能登录上 GitHub，并拥有一个 GitHub 账号。

### 1. Fork 本项目（必须）

点击右上角的 Fork 按钮，将本项目复制到你的仓库中。

![](https://cdn.jsdelivr.net/gh/kaluojushi/Corecabin-Picbed/img/zju-health-report/01.png)

Fork 完成后，你的仓库中会多出一个 `zju-health-report` 项目。进入自己的项目，可以看到项目名称下会显示 `forked from kaluojushi/zju-health-report`，表示你已经成功 Fork 了本项目。

![](https://cdn.jsdelivr.net/gh/kaluojushi/Corecabin-Picbed/img/zju-health-report/02.png)

### 2. 获取打卡 Cookie（必须）

以下操作需要在浏览器中完成，推荐使用 Chrome 浏览器。

1. 用浏览器访问：<https://healthreport.zju.edu.cn/ncov/wap/default/index>。
2. 如果你已经登录了浙大统一身份认证系统，那么你可以直接看到打卡页面，否则需要先登录，登录后会跳转到打卡页面。
3. 点击地址栏前面的 🔒 图标，选择 `Cookie`：

  ![](https://cdn.jsdelivr.net/gh/kaluojushi/Corecabin-Picbed/img/zju-health-report/03.png)

4. 在弹框中选择 `healthreport.zju.edu.cn`、`Cookie`、`eai-sess`，复制 Cookie 内容，即红框中的内容：

  ![](https://cdn.jsdelivr.net/gh/kaluojushi/Corecabin-Picbed/img/zju-health-report/04.png)

### 3. 配置 GitHub Secrets（必须）

打开项目，点击 `Settings`，选择左侧的 `Secrets`、`Actions`，点击 `New repository secret`：

![](https://cdn.jsdelivr.net/gh/kaluojushi/Corecabin-Picbed/img/zju-health-report/05.png)

在 `Name` 中输入 `COOKIE`，在 `Value` 中输入刚刚复制的 Cookie，点击 `Add secret`：

![](https://cdn.jsdelivr.net/gh/kaluojushi/Corecabin-Picbed/img/zju-health-report/06.png)

在 [手动运行](#4.1 手动运行（至少一次）) 一次后，你就完成了所有必需的配置，可以点击 `Actions`，查看打卡结果。

**如果 Cookie 过期，重复第 2、3 步，重新配置即可。**

### 4. 配置 GitHub Actions（推荐）

GitHub Actions 是 GitHub 提供的自动化服务，可以在指定时间自动运行指定的脚本。

如果你还没有开启 GitHub Actions，先点击 `Settings`，选择左侧的 `Actions`、`General`，点击 `Allow all actions and reusable workflows`，然后 `Save`：

![](https://cdn.jsdelivr.net/gh/kaluojushi/Corecabin-Picbed/img/zju-health-report/07.png)

#### 4.1 手动运行（至少一次）

点击 `Actions`，选择左侧的 `report`，点击右侧的 `Run workflow`，即可手动运行打卡脚本：

![](https://cdn.jsdelivr.net/gh/kaluojushi/Corecabin-Picbed/img/zju-health-report/08.png)

点击运行的 `report`，打开 `health-report`， 可以查看打卡结果：

![](https://cdn.jsdelivr.net/gh/kaluojushi/Corecabin-Picbed/img/zju-health-report/09.png)

#### 4.2 定时运行（可选）

点击 `Code`，打开 `.github/workflows/report.yml`，修改 `cron` 表达式，即可定时运行打卡脚本：

```yaml
on:
  workflow_dispatch:  # 手动触发
  schedule:
    - cron: '10 16 * * *' # 每天 0 点 10 分触发
    # 这里表示每天的 UTC 16:10 （即北京时间 0:10）触发
    # 具体的时间格式可以参考这里：https://crontab.guru/
```

### 5. 配置钉钉通知机器人（推荐）

钉钉机器人将把每次打卡结果发送到钉钉群中，方便查看打卡结果。

1. 打开电脑版钉钉，创建一个只有你自己的群。
2. 点击 `群设置`，选择 `智能群助手`，点击 `添加机器人`，选择 `自定义机器人`：

  ![](https://cdn.jsdelivr.net/gh/kaluojushi/Corecabin-Picbed/img/zju-health-report/11.png)

3. 机器人名字随意，选择 `自定义关键词`，填写 `填报`，点击 `完成`：

  ![](https://cdn.jsdelivr.net/gh/kaluojushi/Corecabin-Picbed/img/zju-health-report/12.png)

4. 在 `Webhook` 中，复制 `access_token=` 后面的内容，即红框中的内容：

  ![](https://cdn.jsdelivr.net/gh/kaluojushi/Corecabin-Picbed/img/zju-health-report/13.png)

5. 在项目中，点击 `Settings`，选择左侧的 `Secrets`、`Actions`，点击 `New repository secret`，添加一条名为 `DINGTALK_TOKEN` 的 `Secret`，`Value` 为刚刚复制的内容，点击 `Add secret`：

  ![](https://cdn.jsdelivr.net/gh/kaluojushi/Corecabin-Picbed/img/zju-health-report/14.png)

每次 GitHub Actions 运行，都会向钉钉群发送打卡结果：

![](https://cdn.jsdelivr.net/gh/kaluojushi/Corecabin-Picbed/img/zju-health-report/16.png)

### 6. 更新项目（推荐）

如果你看到了这个信息，说明项目已经更新了。你可以选择 `Code`、`Sync fork`、`Update branch`，将项目更新到最新版本：

![](https://cdn.jsdelivr.net/gh/kaluojushi/Corecabin-Picbed/img/zju-health-report/17.png)

每次更新项目，可能需要重新配置一下打卡时间。

## 项目说明

- 由于现在的打卡已经不需要验证码了，所以脚本里 **没有配置验证码识别**。
- 每次打卡的时间可能会有一定的偏差，晚几分钟到几十分钟不等。
  - 学校提示不要在 0 点前后打卡，可能会造成打卡失败。
- 如果要 **关闭 GitHub Actions**，选择 `Settings`、`Actions`、`General`、`Disable actions`。
  - 或选择 `Actions`、`report`、`Disable workflow`。
- 打卡所在地是基于上一次打卡的地点，如果你想修改打卡所在地，可以 **先手动打卡一次**。
- 脚本是开源的，不存在安全问题，获取 Cookie 是在你自己的仓库中通过 GitHub Secrets 传递的。
- 如果遇到任何打卡问题，可以提 Issue 或 98 站短联系。

## 更新说明

- 2021.11.24：锁定 Axios 版本，修复打卡失败（`Error: 请检查 Cookie 是否正确`）的问题。
- 2021.10.30：发布项目。

## 原理

- Axios：一个基于 Promise 的 HTTP 库，用于发送 HTTP 请求。
- GitHub Actions：GitHub 提供的 CI/CD 服务，可以定时运行脚本。
