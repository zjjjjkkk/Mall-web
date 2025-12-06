<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.orderSn" class="input-width" placeholder="订单编号"></el-input>
          </el-form-item>
          <el-form-item label="收货人：">
            <el-input v-model="listQuery.receiverKeyword" class="input-width" placeholder="收货人姓名/手机号码"></el-input>
          </el-form-item>
          <el-form-item label="提交时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.createTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="订单状态：">
            <el-select v-model="listQuery.status" class="input-width" placeholder="全部" clearable>
              <el-option v-for="item in statusOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单分类：">
            <el-select v-model="listQuery.orderType" class="input-width" placeholder="全部" clearable>
              <el-option v-for="item in orderTypeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单来源：">
            <el-select v-model="listQuery.sourceType" class="input-width" placeholder="全部" clearable>
              <el-option v-for="item in sourceTypeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 新增：退款状态筛选 -->
          <el-form-item label="退款状态：">
            <el-select v-model="listQuery.refundStatus" class="input-width" placeholder="全部" clearable>
              <el-option v-for="item in refundStatusOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="orderTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="80" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="订单编号" width="180" align="center">
          <template slot-scope="scope">{{scope.row.orderSn}}</template>
        </el-table-column>
        <el-table-column label="提交时间" width="180" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="用户账号" align="center">
          <template slot-scope="scope">{{scope.row.memberUsername}}</template>
        </el-table-column>
        <el-table-column label="订单金额" width="120" align="center">
          <template slot-scope="scope">￥{{scope.row.totalAmount}}</template>
        </el-table-column>
        <el-table-column label="支付方式" width="120" align="center">
          <template slot-scope="scope">{{scope.row.payType | formatPayType}}</template>
        </el-table-column>
        <el-table-column label="订单来源" width="120" align="center">
          <template slot-scope="scope">{{scope.row.sourceType | formatSourceType}}</template>
        </el-table-column>
        <el-table-column label="订单状态" width="120" align="center">
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
        <!-- 新增：退款状态列 -->
        <el-table-column label="退款状态" width="140" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.refundStatus === 0" type="warning">待审核</el-tag>
            <el-tag v-else-if="scope.row.refundStatus === 1" type="info">退款中</el-tag>
            <el-tag v-else-if="scope.row.refundStatus === 2" type="success">已退款</el-tag>
            <el-tag v-else-if="scope.row.refundStatus === 3" type="danger">已拒绝</el-tag>
            <el-tag v-else-if="scope.row.refundStatus === 4" type="danger">退款失败</el-tag>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleViewOrder(scope.$index, scope.row)"
            >查看订单</el-button>
            <!-- 新增：退款审核按钮 -->
            <el-button
              size="mini"
              type="warning"
              @click="handleViewRefund(scope.$index, scope.row)"
              v-if="scope.row.refundStatus === 0"
            >退款审核</el-button>
            <el-button
              size="mini"
              type="info"
              @click="handleViewRefund(scope.$index, scope.row)"
              v-if="scope.row.refundStatus !== null && scope.row.refundStatus !== undefined && scope.row.refundStatus !== 0"
            >查看退款</el-button>
            <el-button
              size="mini"
              @click="handleCloseOrder(scope.$index, scope.row)"
              v-show="scope.row.status===0">关闭订单</el-button>
            <el-button
              size="mini"
              @click="handleDeliveryOrder(scope.$index, scope.row)"
              v-show="scope.row.status===1">订单发货</el-button>
            <el-button
              size="mini"
              @click="handleViewLogistics(scope.$index, scope.row)"
              v-show="scope.row.status===2||scope.row.status===3">订单跟踪</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteOrder(scope.$index, scope.row)"
              v-show="scope.row.status===4">删除订单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operateOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      title="关闭订单"
      :visible.sync="closeOrder.dialogVisible" width="30%">
      <span style="vertical-align: top">操作备注：</span>
      <el-input
        style="width: 80%"
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="closeOrder.content">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeOrder.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCloseOrderConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增：退款审核对话框 -->
    <el-dialog
      :title="refundDialog.title"
      :visible.sync="refundDialog.dialogVisible"
      width="50%"
      @close="handleRefundDialogClose">
      <div v-if="refundDialog.refundInfo" style="padding: 20px;">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="订单编号">{{refundDialog.refundInfo.orderSn}}</el-descriptions-item>
          <el-descriptions-item label="退款编号">{{refundDialog.refundInfo.refundSn}}</el-descriptions-item>
          <el-descriptions-item label="退款金额">
            <span style="color: #f56c6c; font-weight: bold;">￥{{refundDialog.refundInfo.refundAmount}}</span>
          </el-descriptions-item>
          <el-descriptions-item label="退款状态">
            <el-tag v-if="refundDialog.refundInfo.refundStatus === 0" type="warning">待审核</el-tag>
            <el-tag v-else-if="refundDialog.refundInfo.refundStatus === 1" type="info">退款中</el-tag>
            <el-tag v-else-if="refundDialog.refundInfo.refundStatus === 2" type="success">已退款</el-tag>
            <el-tag v-else-if="refundDialog.refundInfo.refundStatus === 3" type="danger">已拒绝</el-tag>
            <el-tag v-else-if="refundDialog.refundInfo.refundStatus === 4" type="danger">退款失败</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="申请时间" :span="2">
            {{refundDialog.refundInfo.createTime | formatCreateTime}}
          </el-descriptions-item>
          <el-descriptions-item label="退款原因" :span="2">
            <div style="padding: 10px; background: #f5f7fa; border-radius: 4px;">
              {{refundDialog.refundInfo.refundReason || '无'}}
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="备注说明" :span="2" v-if="refundDialog.refundInfo.remark">
            <div style="padding: 10px; background: #f5f7fa; border-radius: 4px;">
              {{refundDialog.refundInfo.remark}}
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="审核备注" :span="2" v-if="refundDialog.refundInfo.auditNote">
            <div style="padding: 10px; background: #f5f7fa; border-radius: 4px; color: #f56c6c;">
              {{refundDialog.refundInfo.auditNote}}
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="审核时间" :span="2" v-if="refundDialog.refundInfo.auditTime">
            {{refundDialog.refundInfo.auditTime | formatCreateTime}}
          </el-descriptions-item>
          <el-descriptions-item label="退款时间" :span="2" v-if="refundDialog.refundInfo.refundTime">
            {{refundDialog.refundInfo.refundTime | formatCreateTime}}
          </el-descriptions-item>
        </el-descriptions>
        <!-- 审核操作区域 -->
        <div v-if="refundDialog.refundInfo.refundStatus === 0" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
          <el-form :model="refundDialog.auditForm" label-width="100px">
            <el-form-item label="审核操作：">
              <el-radio-group v-model="refundDialog.auditForm.auditType">
                <el-radio :label="1">通过</el-radio>
                <el-radio :label="2">拒绝</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="审核备注：" :required="refundDialog.auditForm.auditType === 2">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="拒绝时请填写拒绝原因"
                v-model="refundDialog.auditForm.auditNote">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-else style="text-align: center; padding: 40px;">
        <i class="el-icon-loading" style="font-size: 24px;"></i>
        <p>加载中...</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refundDialog.dialogVisible = false">关 闭</el-button>
        <el-button
          v-if="refundDialog.refundInfo && refundDialog.refundInfo.refundStatus === 0"
          type="primary"
          @click="handleRefundAuditConfirm"
          :loading="refundDialog.auditing">
          {{refundDialog.auditing ? '审核中...' : '确认审核'}}
        </el-button>
      </span>
    </el-dialog>
    <logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog>
  </div>
</template>

<script>
import {fetchList, closeOrder, deleteOrder} from '@/api/order'
import {getRefundDetail, auditRefund, getRefundByOrderSn} from '@/api/order'
import {formatDate} from '@/utils/date';
import LogisticsDialog from '@/views/oms/order/components/logisticsDialog';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  orderSn: null,
  receiverKeyword: null,
  status: null,
  orderType: null,
  sourceType: null,
  createTime: null,
  refundStatus: null, // 新增：退款状态筛选参数
};

export default {
  name: "orderList",
  components: {LogisticsDialog},
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
      operateType: null,
      multipleSelection: [],
      closeOrder: {
        dialogVisible: false,
        content: null,
        orderIds: []
      },
      // 新增：退款审核对话框
      refundDialog: {
        dialogVisible: false,
        title: '退款审核',
        refundInfo: null,
        auditing: false,
        auditForm: {
          auditType: 1, // 1-通过, 2-拒绝
          auditNote: ''
        },
        currentOrderId: null
      },
      statusOptions: [
        {label: '待付款', value: 0},
        {label: '待发货', value: 1},
        {label: '已发货', value: 2},
        {label: '已完成', value: 3},
        {label: '已关闭', value: 4}
      ],
      orderTypeOptions: [
        {label: '正常订单', value: 0},
        {label: '秒杀订单', value: 1}
      ],
      sourceTypeOptions: [
        {label: 'PC订单', value: 0},
        {label: 'APP订单', value: 1}
      ],
      // 新增：退款状态选项
      refundStatusOptions: [
        {label: '待审核', value: 0},
        {label: '退款中', value: 1},
        {label: '已退款', value: 2},
        {label: '已拒绝', value: 3},
        {label: '退款失败', value: 4}
      ],
      operateOptions: [
        {label: "批量发货", value: 1},
        {label: "关闭订单", value: 2},
        {label: "删除订单", value: 3}
      ],
      logisticsDialogVisible: false
    }
  },
  created() {
    this.getList();
  },
  filters: {
    formatCreateTime(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    formatPayType(value) {
      if (value === 1) return '支付宝';
      else if (value === 2) return '微信';
      else return '未支付';
    },
    formatSourceType(value) {
      return value === 1 ? 'APP订单' : 'PC订单';
    },
    formatStatus(value) {
      const statusMap = {
        0: '待付款',
        1: '待发货',
        2: '已发货',
        3: '已完成',
        4: '已关闭',
        5: '无效订单'
      };
      return statusMap[value] || '未知状态';
    }
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleViewOrder(index, row) {
      this.$router.push({path: '/oms/orderDetail', query: {id: row.id}})
    },
    // 新增：查看/审核退款
    handleViewRefund(index, row) {
      this.refundDialog.dialogVisible = true;
      this.refundDialog.title = row.refundStatus === 0 ? '退款审核' : '退款详情';
      this.refundDialog.currentOrderId = row.id;
      this.refundDialog.auditForm = {
        auditType: 1,
        auditNote: ''
      };
      this.refundDialog.refundInfo = null;

      // 通过订单编号查询退款记录
      if (row.orderSn) {
        this.loadRefundByOrderSn(row.orderSn);
      } else {
        this.$message.warning('订单编号不存在');
      }
    },
    // 通过订单编号加载退款信息
    loadRefundByOrderSn(orderSn) {
      getRefundByOrderSn(orderSn).then(response => {
        if (response.code === 200 && response.data && response.data.list && response.data.list.length > 0) {
          // 取第一条退款记录
          const refundId = response.data.list[0].id;
          this.loadRefundDetail(refundId);
        } else {
          this.$message.warning('该订单暂无退款记录');
          this.refundDialog.refundInfo = null;
        }
      }).catch(error => {
        this.$message.error('查询退款记录失败');
        console.error('查询退款记录失败：', error);
        this.refundDialog.refundInfo = null;
      });
    },
    // 加载退款详情
    loadRefundDetail(refundId) {
      getRefundDetail(refundId).then(response => {
        if (response.code === 200) {
          this.refundDialog.refundInfo = response.data;
        } else {
          this.$message.error(response.message || '获取退款详情失败');
          this.refundDialog.refundInfo = null;
        }
      }).catch(error => {
        this.$message.error('获取退款详情失败');
        console.error('获取退款详情失败：', error);
        this.refundDialog.refundInfo = null;
      });
    },
    // 退款审核确认
    handleRefundAuditConfirm() {
      if (!this.refundDialog.refundInfo) {
        this.$message.warning('退款信息不存在');
        return;
      }

      if (this.refundDialog.auditForm.auditType === 2 && !this.refundDialog.auditForm.auditNote) {
        this.$message.warning('拒绝退款时，审核备注不能为空');
        return;
      }

      this.refundDialog.auditing = true;

      const auditParam = {
        id: this.refundDialog.refundInfo.id,
        auditType: this.refundDialog.auditForm.auditType, // 1-通过, 2-拒绝
        auditNote: this.refundDialog.auditForm.auditNote || ''
      };

      auditRefund(auditParam).then(response => {
        this.refundDialog.auditing = false;
        if (response.code === 200) {
          this.$message.success('审核成功');
          this.refundDialog.dialogVisible = false;
          // 刷新列表
          this.getList();
        } else {
          this.$message.error(response.message || '审核失败');
        }
      }).catch(error => {
        this.refundDialog.auditing = false;
        this.$message.error('审核失败');
        console.error('审核失败：', error);
      });
    },
    // 退款对话框关闭
    handleRefundDialogClose() {
      this.refundDialog.refundInfo = null;
      this.refundDialog.auditForm = {
        auditType: 1,
        auditNote: ''
      };
    },
    handleCloseOrder(index, row) {
      this.closeOrder.dialogVisible = true;
      this.closeOrder.orderIds = [row.id];
    },
    handleDeliveryOrder(index, row) {
      let listItem = this.covertOrder(row);
      this.$router.push({path: '/oms/deliverOrderList', query: {list: [listItem]}})
    },
    handleViewLogistics(index, row) {
      this.logisticsDialogVisible = true;
    },
    handleDeleteOrder(index, row) {
      let ids = [];
      ids.push(row.id);
      this.deleteOrder(ids);
    },
    handleBatchOperate() {
      if (!this.multipleSelection || this.multipleSelection.length < 1) {
        this.$message.warning('请选择要操作的订单');
        return;
      }
      if (this.operateType === 1) {
        // 批量发货
        let list = [];
        this.multipleSelection.forEach(item => {
          if (item.status === 1) list.push(this.covertOrder(item));
        });
        if (list.length === 0) {
          this.$message.warning('选中订单中没有可以发货的订单');
          return;
        }
        this.$router.push({path: '/oms/deliverOrderList', query: {list: list}})
      } else if (this.operateType === 2) {
        // 关闭订单
        this.closeOrder.orderIds = this.multipleSelection.map(item => item.id);
        this.closeOrder.dialogVisible = true;
      } else if (this.operateType === 3) {
        // 删除订单
        let ids = this.multipleSelection.map(item => item.id);
        this.deleteOrder(ids);
      }
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleCloseOrderConfirm() {
      if (!this.closeOrder.content) {
        this.$message.warning('操作备注不能为空');
        return;
      }
      let params = new URLSearchParams();
      params.append('ids', this.closeOrder.orderIds);
      params.append('note', this.closeOrder.content);
      closeOrder(params).then(() => {
        this.closeOrder = {dialogVisible: false, content: null, orderIds: []};
        this.getList();
        this.$message.success('修改成功');
      });
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    deleteOrder(ids) {
      this.$confirm('是否要进行该删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new URLSearchParams();
        params.append("ids", ids);
        deleteOrder(params).then(() => {
          this.$message.success('删除成功！');
          this.getList();
        });
      })
    },
    covertOrder(order) {
      let address = order.receiverProvince + order.receiverCity + order.receiverRegion + order.receiverDetailAddress;
      return {
        orderId: order.id,
        orderSn: order.orderSn,
        receiverName: order.receiverName,
        receiverPhone: order.receiverPhone,
        receiverPostCode: order.receiverPostCode,
        address: address,
        deliveryCompany: null,
        deliverySn: null
      };
    }
  }
}
</script>

<style scoped>
.input-width {
  width: 203px;
}
</style>

