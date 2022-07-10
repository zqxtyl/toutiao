<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form ref="loginFrom" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="1000 * 60"
            format="ss s"
            v-if="isCountDowmShow"
            @finish="isCountDowmShow = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            round
            size="small"
            type="default"
            @click="onSendSms"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user";

export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "", // 手机号
        code: "", // 验证码
      },
      userFormRules: {
        mobile: [
          { required: true, message: "手机号不能为空" },
          { pattern: /1[3|5|7|8]\d{9}/, message: "手机号格式错误" },
        ],
        code: [
          { required: true, message: "验证码不能为空" },
          { pattern: /\d{6}$/, message: "验证码格式错误" },
        ],
      },
      isCountDowmShow: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      // 1. 获取表单数据
      const user = this.user;

      // TODO: 2. 表单验证
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0,
      });

      // 3. 提交表单请求登录
      try {
        const { data } = await login(this.user)
        this.$store.commit('setUser', data.data)
        console.log(data.data);
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("手机号或验证码错误");
        } else {
          this.$toast.fail("登录失败");
        }
      }

      // 4. 根据请求响应结果处理后续操作
    },
    async onSendSms() {
      try {
        await this.$refs.loginFrom.validate("mobile");
      } catch (error) {
        return console.log("验证失败", error);
      }
      this.isCountDowmShow = true;

      try {
        this.$toast("发送成功");
      } catch (error) {
        this.isCountDowmShow = false;
        if (error.response.status == 429) {
          this.$toast("发送太频繁了");
        } else {
          this.$toast("发送失败");
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }

  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }

  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
