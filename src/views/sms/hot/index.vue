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
          <el-form-item label="商品名称：">
            <el-input v-model="listQuery.productName" class="input-width" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="推荐状态：">
            <el-select v-model="listQuery.recommendStatus" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in recommendOptions"
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
      <span>数据列表（按综合人气评分排序）</span>
    </el-card>
    <div class="table-container">
      <el-table ref="hotProductTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="商品ID" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="商品名称" align="center" min-width="200">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="综合人气评分" width="150" align="center" sortable>
          <template slot-scope="scope">
            <el-tag type="success" size="small">{{scope.row.popularityScore || 0}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="点击量" width="100" align="center">
          <template slot-scope="scope">{{scope.row.clickCount || 0}}</template>
        </el-table-column>
        <el-table-column label="加购次数" width="100" align="center">
          <template slot-scope="scope">{{scope.row.cartCount || 0}}</template>
        </el-table-column>
        <el-table-column label="购买次数" width="100" align="center">
          <template slot-scope="scope">{{scope.row.purchaseCount || 0}}</template>
        </el-table-column>
        <el-table-column label="销量" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sale || 0}}</template>
        </el-table-column>
        <el-table-column label="是否推荐" width="150" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleRecommendStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.isRecommended">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isRecommended === 1" style="color: #67C23A">推荐中</span>
            <span v-else style="color: #909399">未推荐</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
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
        :page-size="listQuery.pageSize"
        :page-sizes="[10,20,50,100]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {fetchListWithScore, updateRecommendStatus} from '@/api/hotProduct';

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    productName: null,
    recommendStatus: null
  };
  const defaultRecommendOptions = [
    {
      label: '未推荐',
      value: 0
    },
    {
      label: '推荐中',
      value: 1
    }
  ];
  export default {
    name: 'hotProductList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        recommendOptions: Object.assign({}, defaultRecommendOptions),
        list: null,
        total: null,
        listLoading: false,
        multipleSelection: [],
        operates: [
          {
            label: "设为推荐",
            value: 0
          },
          {
            label: "取消推荐",
            value: 1
          }
        ],
        operateType: null
      }
    },
    created() {
      this.getList();
    },
    methods: {
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
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
      handleRecommendStatusChange(index, row){
        const productIds = [row.id];
        const status = row.isRecommended;
        this.updateRecommendStatusStatus(productIds, status);
      },
      handleBatchOperate(){
        if (this.multipleSelection < 1) {
          this.$message({
            message: '请选择一条记录',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }
        if (this.operateType === 0) {
          //设为推荐
          this.updateRecommendStatusStatus(ids, 1);
        } else if (this.operateType === 1) {
          //取消推荐
          this.updateRecommendStatusStatus(ids, 0);
        } else {
          this.$message({
            message: '请选择批量操作类型',
            type: 'warning',
            duration: 1000
          });
        }
      },
      getList() {
        this.listLoading = true;
        fetchListWithScore(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        })
      },
      updateRecommendStatusStatus(ids, status){
        this.$confirm('是否要修改推荐状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
          if (Array.isArray(ids)) {
            params.append("ids", ids.join(','));
          } else {
            params.append("ids", ids);
          }
          params.append("recommendStatus", status);
          updateRecommendStatus(params).then(response=>{
            this.getList();
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作!'
          });
          // 恢复原状态
          this.getList();
        });
      }
    }
  }
</script>
<style></style>
