<template>
  <div class="app-container">
    <div class="total-layout">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_order" class="total-icon">
            <div class="total-title">今日订单总数</div>
            <div class="total-value">200</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_today_amount" class="total-icon">
            <div class="total-title">今日销售总额</div>
            <div class="total-value">￥5000.00</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_yesterday_amount" class="total-icon">
            <div class="total-title">昨日销售总额</div>
            <div class="total-value">￥5000.00</div>
          </div>
        </el-col>
        <!--<el-col :span="6">-->
          <!--<div class="total-frame">-->
            <!--<svg-icon icon-class="total-week" class="total-icon">-->
            <!--</svg-icon>-->
            <!--<div class="total-title">近7天销售总额</div>-->
            <!--<div class="total-value">￥50000.00</div>-->
          <!--</div>-->
        <!--</el-col>-->
      </el-row>
    </div>
    <div class="un-handle-layout">
      <div class="layout-title">待处理事务</div>
      <div class="un-handle-content">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待付款订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已完成订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待确认收货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待发货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">新缺货登记</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待处理退款申请</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已发货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待处理退货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">广告位即将到期</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item" style="cursor: pointer;" @click="goToFeedback">
              <span class="font-medium">待处理客服反馈</span>
              <span style="float: right" class="color-danger">({{ pendingFeedbackCount }})</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="overview-layout">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">商品总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">100</el-col>
                <el-col :span="6" class="color-danger overview-item-value">400</el-col>
                <el-col :span="6" class="color-danger overview-item-value">50</el-col>
                <el-col :span="6" class="color-danger overview-item-value">500</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">已下架</el-col>
                <el-col :span="6" class="overview-item-title">已上架</el-col>
                <el-col :span="6" class="overview-item-title">库存紧张</el-col>
                <el-col :span="6" class="overview-item-title">全部商品</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">用户总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">100</el-col>
                <el-col :span="6" class="color-danger overview-item-value">200</el-col>
                <el-col :span="6" class="color-danger overview-item-value">1000</el-col>
                <el-col :span="6" class="color-danger overview-item-value">5000</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">今日新增</el-col>
                <el-col :span="6" class="overview-item-title">昨日新增</el-col>
                <el-col :span="6" class="overview-item-title">本月新增</el-col>
                <el-col :span="6" class="overview-item-title">会员总数</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 客服反馈管理区域 -->
    <div class="feedback-layout" style="margin-top: 20px;">
      <div class="layout-title">
        <span>客服反馈管理</span>
        <el-button type="primary" size="small" style="float: right; margin-top: -5px;" @click="goToFeedback">查看全部</el-button>
      </div>
      <div style="padding: 20px;">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="feedback-stat-item">
              <div class="feedback-stat-value color-warning">{{ pendingFeedbackCount }}</div>
              <div class="feedback-stat-title">待处理</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="feedback-stat-item">
              <div class="feedback-stat-value color-primary">{{ processingFeedbackCount }}</div>
              <div class="feedback-stat-title">处理中</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="feedback-stat-item">
              <div class="feedback-stat-value color-success">{{ processedFeedbackCount }}</div>
              <div class="feedback-stat-title">已处理</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="feedback-stat-item">
              <div class="feedback-stat-value">{{ totalFeedbackCount }}</div>
              <div class="feedback-stat-title">全部反馈</div>
            </div>
          </el-col>
        </el-row>
        
        <!-- 最近反馈列表 -->
        <div style="margin-top: 20px;">
          <div style="font-weight: bold; margin-bottom: 10px;">最近反馈</div>
          <el-table
            :data="recentFeedbackList"
            border
            style="width: 100%"
            max-height="300"
            v-loading="feedbackLoading"
          >
            <el-table-column label="会员" prop="memberName" width="120" align="center" />
            <el-table-column label="反馈类型" width="100" align="center">
              <template slot-scope="scope">
                <el-tag :type="getTypeTagType(scope.row.type)" size="small">
                  {{ getTypeText(scope.row.type) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="反馈内容" min-width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.content | ellipsis(50) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="100" align="center">
              <template slot-scope="scope">
                <el-tag :type="getStatusTagType(scope.row.status)" size="small">
                  {{ getStatusText(scope.row.status) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="提交时间" width="180" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleViewFeedback(scope.row)">查看</el-button>
                <el-button v-if="scope.row.status !== 2" size="mini" type="success" @click="handleReplyFeedback(scope.row)">回复</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="statistics-layout">
      <div class="layout-title">订单统计</div>
      <el-row>
        <el-col :span="4">
          <div style="padding: 20px">
            <div>
              <div style="color: #909399;font-size: 14px">本月订单总数</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">10000</div>
              <div>
                <span class="color-success" style="font-size: 14px">+10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本周订单总数</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">1000</div>
              <div>
                <span class="color-danger" style="font-size: 14px">-10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本月销售总额</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">100000</div>
              <div>
                <span class="color-success" style="font-size: 14px">+10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本周销售总额</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">50000</div>
              <div>
                <span class="color-danger" style="font-size: 14px">-10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div style="padding: 10px;border-left:1px solid #DCDFE6">
            <el-date-picker
              style="float: right;z-index: 1"
              size="small"
              v-model="orderCountDate"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="handleDateChange"
              :picker-options="pickerOptions">
            </el-date-picker>
            <div>
              <ve-line
                :data="chartData"
                :legend-visible="false"
                :loading="loading"
                :data-empty="dataEmpty"
                :settings="chartSettings"></ve-line>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 反馈详情/回复对话框 -->
    <el-dialog :title="feedbackDialogTitle" :visible.sync="feedbackDialogVisible" width="800px">
      <el-form ref="feedbackForm" :model="currentFeedback" label-position="left" label-width="100px">
        <el-form-item label="会员名称">
          <span>{{ currentFeedback.memberName || '--' }}</span>
        </el-form-item>
        <el-form-item label="反馈类型">
          <el-tag :type="getTypeTagType(currentFeedback.type)">
            {{ getTypeText(currentFeedback.type) }}
          </el-tag>
        </el-form-item>
        <el-form-item label="反馈内容">
          <div style="padding: 10px; background: #f5f5f5; border-radius: 4px; min-height: 100px;">
            {{ currentFeedback.content }}
          </div>
        </el-form-item>
        <el-form-item label="反馈图片" v-if="feedbackImageList.length > 0">
          <div class="image-list">
            <el-image
              v-for="(img, index) in feedbackImageList"
              :key="index"
              :src="img"
              :preview-src-list="feedbackImageList"
              style="width: 100px; height: 100px; margin-right: 10px;"
              fit="cover"
            />
          </div>
        </el-form-item>
        <el-form-item label="状态">
          <el-tag :type="getStatusTagType(currentFeedback.status)">
            {{ getStatusText(currentFeedback.status) }}
          </el-tag>
        </el-form-item>
        <el-form-item label="提交时间">
          <span>{{ currentFeedback.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </el-form-item>
        <el-form-item label="管理员回复" v-if="currentFeedback.reply">
          <div style="padding: 10px; background: #e6f7ff; border-radius: 4px; min-height: 80px;">
            {{ currentFeedback.reply }}
          </div>
          <div style="margin-top: 10px; font-size: 12px; color: #999;">
            回复人：{{ currentFeedback.replyAdminName || '--' }} | 
            回复时间：{{ currentFeedback.replyTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </div>
        </el-form-item>
        <el-form-item label="回复内容" v-if="!currentFeedback.reply">
          <el-input
            v-model="replyContent"
            type="textarea"
            :rows="4"
            placeholder="请输入回复内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="!currentFeedback.reply" type="primary" @click="submitFeedbackReply">提交回复</el-button>
        <el-button v-if="currentFeedback.status === 0" type="warning" @click="updateFeedbackStatus(1)">标记为处理中</el-button>
        <el-button v-if="currentFeedback.status === 1" type="success" @click="updateFeedbackStatus(2)">标记为已处理</el-button>
        <el-button v-if="currentFeedback.status !== 3" type="info" @click="updateFeedbackStatus(3)">关闭反馈</el-button>
        <el-button @click="feedbackDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {str2Date} from '@/utils/date';
  import { fetchList, getDetail, reply, updateStatus } from '@/api/feedback';
  import img_home_order from '@/assets/images/home_order.png';
  import img_home_today_amount from '@/assets/images/home_today_amount.png';
  import img_home_yesterday_amount from '@/assets/images/home_yesterday_amount.png';
  const DATA_FROM_BACKEND = {
    columns: ['date', 'orderCount','orderAmount'],
    rows: [
      {date: '2018-11-01', orderCount: 10, orderAmount: 1093},
      {date: '2018-11-02', orderCount: 20, orderAmount: 2230},
      {date: '2018-11-03', orderCount: 33, orderAmount: 3623},
      {date: '2018-11-04', orderCount: 50, orderAmount: 6423},
      {date: '2018-11-05', orderCount: 80, orderAmount: 8492},
      {date: '2018-11-06', orderCount: 60, orderAmount: 6293},
      {date: '2018-11-07', orderCount: 20, orderAmount: 2293},
      {date: '2018-11-08', orderCount: 60, orderAmount: 6293},
      {date: '2018-11-09', orderCount: 50, orderAmount: 5293},
      {date: '2018-11-10', orderCount: 30, orderAmount: 3293},
      {date: '2018-11-11', orderCount: 20, orderAmount: 2293},
      {date: '2018-11-12', orderCount: 80, orderAmount: 8293},
      {date: '2018-11-13', orderCount: 100, orderAmount: 10293},
      {date: '2018-11-14', orderCount: 10, orderAmount: 1293},
      {date: '2018-11-15', orderCount: 40, orderAmount: 4293}
    ]
  };
  export default {
    name: 'home',
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              let start = new Date(2018,10,1);
              const end = new Date(start.getTime() + 1000 * 60 * 60 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一月',
            onClick(picker) {
              let start = new Date(2018,10,1);
              const end = new Date(start.getTime() + 1000 * 60 * 60 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        orderCountDate: '',
        chartSettings: {
          xAxisType: 'time',
          area:true,
          axisSite: { right: ['orderAmount']},
        labelMap: {'orderCount': '订单数量', 'orderAmount': '订单金额'}},
        chartData: {
          columns: [],
          rows: []
        },
        loading: false,
        dataEmpty: false,
        img_home_order,
        img_home_today_amount,
        img_home_yesterday_amount,
        // 客服反馈相关数据
        feedbackLoading: false,
        pendingFeedbackCount: 0,
        processingFeedbackCount: 0,
        processedFeedbackCount: 0,
        totalFeedbackCount: 0,
        recentFeedbackList: [],
        feedbackDialogVisible: false,
        feedbackDialogTitle: '反馈详情',
        currentFeedback: {},
        replyContent: '',
        feedbackImageList: []
      }
    },
    filters: {
      ellipsis(value, length = 50) {
        if (!value) return '';
        if (value.length <= length) return value;
        return value.substring(0, length) + '...';
      }
    },
    created(){
      this.initOrderCountDate();
      this.getData();
      this.loadFeedbackData();
    },
    methods:{
      handleDateChange(){
        this.getData();
      },
      initOrderCountDate(){
        let start = new Date(2018,10,1);
        const end = new Date(start.getTime() + 1000 * 60 * 60 * 24 * 7);
        this.orderCountDate=[start,end];
      },
      getData(){
        setTimeout(() => {
          this.chartData = {
            columns: ['date', 'orderCount','orderAmount'],
            rows: []
          };
          for(let i=0;i<DATA_FROM_BACKEND.rows.length;i++){
            let item=DATA_FROM_BACKEND.rows[i];
            let currDate=str2Date(item.date);
            let start=this.orderCountDate[0];
            let end=this.orderCountDate[1];
            if(currDate.getTime()>=start.getTime()&&currDate.getTime()<=end.getTime()){
              this.chartData.rows.push(item);
            }
          }
          this.dataEmpty = false;
          this.loading = false
        }, 1000)
      },
      // 加载客服反馈数据
      loadFeedbackData() {
        this.feedbackLoading = true;
        // 获取待处理反馈数量
        fetchList({ status: 0, pageNum: 1, pageSize: 1 }).then(response => {
          if (response.code === 200) {
            this.pendingFeedbackCount = (response.data && response.data.total) || 0;
          }
        }).catch(() => {
          this.pendingFeedbackCount = 0;
        });
        
        // 获取处理中反馈数量
        fetchList({ status: 1, pageNum: 1, pageSize: 1 }).then(response => {
          if (response.code === 200) {
            this.processingFeedbackCount = (response.data && response.data.total) || 0;
          }
        }).catch(() => {
          this.processingFeedbackCount = 0;
        });
        
        // 获取已处理反馈数量
        fetchList({ status: 2, pageNum: 1, pageSize: 1 }).then(response => {
          if (response.code === 200) {
            this.processedFeedbackCount = (response.data && response.data.total) || 0;
          }
        }).catch(() => {
          this.processedFeedbackCount = 0;
        });
        
        // 获取全部反馈数量
        fetchList({ pageNum: 1, pageSize: 1 }).then(response => {
          if (response.code === 200) {
            this.totalFeedbackCount = (response.data && response.data.total) || 0;
          }
        }).catch(() => {
          this.totalFeedbackCount = 0;
        });
        
        // 获取最近5条反馈
        fetchList({ pageNum: 1, pageSize: 5 }).then(response => {
          this.feedbackLoading = false;
          if (response.code === 200) {
            if (response.data && response.data.list) {
              this.recentFeedbackList = response.data.list;
            } else if (Array.isArray(response.data)) {
              this.recentFeedbackList = response.data;
            } else {
              this.recentFeedbackList = [];
            }
          } else {
            this.recentFeedbackList = [];
          }
        }).catch(() => {
          this.feedbackLoading = false;
          this.recentFeedbackList = [];
        });
      },
      // 跳转到反馈管理页面
      goToFeedback() {
        this.$router.push({ path: '/feedback/customer-service' });
      },
      // 查看反馈详情
      handleViewFeedback(row) {
        getDetail(row.id).then(response => {
          if (response.code === 200) {
            this.currentFeedback = Object.assign({}, response.data);
            if (this.currentFeedback.images) {
              this.feedbackImageList = this.currentFeedback.images.split(',').filter(img => img);
            } else {
              this.feedbackImageList = [];
            }
            this.replyContent = '';
            this.feedbackDialogTitle = '反馈详情';
            this.feedbackDialogVisible = true;
          }
        }).catch(() => {
          this.currentFeedback = Object.assign({}, row);
          if (this.currentFeedback.images) {
            this.feedbackImageList = this.currentFeedback.images.split(',').filter(img => img);
          } else {
            this.feedbackImageList = [];
          }
          this.replyContent = '';
          this.feedbackDialogTitle = '反馈详情';
          this.feedbackDialogVisible = true;
        });
      },
      // 回复反馈
      handleReplyFeedback(row) {
        this.handleViewFeedback(row);
        this.feedbackDialogTitle = '回复反馈';
      },
      // 提交回复
      submitFeedbackReply() {
        if (!this.replyContent.trim()) {
          this.$message.warning('请输入回复内容');
          return;
        }
        reply(this.currentFeedback.id, this.replyContent).then(response => {
          this.$message.success('回复成功');
          this.feedbackDialogVisible = false;
          this.loadFeedbackData();
        });
      },
      // 更新反馈状态
      updateFeedbackStatus(status) {
        const statusText = {
          1: '处理中',
          2: '已处理',
          3: '已关闭'
        }[status];
        this.$confirm(`确定要标记为"${statusText}"吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateStatus(this.currentFeedback.id, status).then(response => {
            this.$message.success('更新成功');
            this.feedbackDialogVisible = false;
            this.loadFeedbackData();
          });
        });
      },
      // 获取反馈类型文本
      getTypeText(type) {
        const types = ['咨询', '建议', '投诉', '其他'];
        return types[type] || '其他';
      },
      // 获取反馈类型标签类型
      getTypeTagType(type) {
        const types = ['', 'success', 'warning', 'info'];
        return types[type] || 'info';
      },
      // 获取状态文本
      getStatusText(status) {
        const statusMap = {
          0: '待处理',
          1: '处理中',
          2: '已处理',
          3: '已关闭'
        };
        return statusMap[status] || '未知';
      },
      // 获取状态标签类型
      getStatusTagType(status) {
        const types = {
          0: 'warning',
          1: 'primary',
          2: 'success',
          3: 'info'
        };
        return types[status] || 'info';
      }
    }
  }
</script>

<style scoped>
  .app-container {
    margin-top: 40px;
    margin-left: 120px;
    margin-right: 120px;
  }

  .address-layout {
  }

  .total-layout {
    margin-top: 20px;
  }

  .total-frame {
    border: 1px solid #DCDFE6;
    padding: 20px;
    height: 100px;
  }

  .total-icon {
    color: #409EFF;
    width: 60px;
    height: 60px;
  }

  .total-title {
    position: relative;
    font-size: 16px;
    color: #909399;
    left: 70px;
    top: -50px;
  }

  .total-value {
    position: relative;
    font-size: 18px;
    color: #606266;
    left: 70px;
    top: -40px;
  }

  .un-handle-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }

  .layout-title {
    color: #606266;
    padding: 15px 20px;
    background: #F2F6FC;
    font-weight: bold;
  }

  .un-handle-content {
    padding: 20px 40px;
  }

  .un-handle-item {
    border-bottom: 1px solid #EBEEF5;
    padding: 10px;
  }

  .overview-layout {
    margin-top: 20px;
  }

  .overview-item-value {
    font-size: 24px;
    text-align: center;
  }

  .overview-item-title {
    margin-top: 10px;
    text-align: center;
  }

  .out-border {
    border: 1px solid #DCDFE6;
  }

  .statistics-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }
  .mine-layout {
    position: absolute;
    right: 140px;
    top: 107px;
    width: 250px;
    height: 235px;
  }
  .address-content{
    padding: 20px;
    font-size: 18px
  }
  .feedback-layout {
    border: 1px solid #DCDFE6;
  }
  .feedback-stat-item {
    text-align: center;
    padding: 20px;
    border: 1px solid #EBEEF5;
    border-radius: 4px;
  }
  .feedback-stat-value {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .feedback-stat-title {
    font-size: 14px;
    color: #909399;
  }
  .color-warning {
    color: #E6A23C;
  }
  .color-primary {
    color: #409EFF;
  }
  .color-success {
    color: #67C23A;
  }
  .image-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
</style>
