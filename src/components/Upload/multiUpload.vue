<template>
  <div>
    <el-upload :action="useOss ? ossUploadUrl : minioUploadUrl" list-type="picture-card" :file-list="fileList"
      :before-upload="beforeUpload" :on-remove="handleRemove" :on-success="handleUploadSuccess"
      :on-preview="handlePreview" :limit="maxCount" :on-exceed="handleExceed">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
// 注意：已移除 policy 导入（不再需要）
export default {
  name: 'multiUpload',
  props: {
    //图片属性数组
    value: Array,
    //最大上传图片数量
    maxCount: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      // 注意：dataObj 已无实际作用（但保留结构避免报错）
      dataObj: {
        policy: '',
        signature: '',
        key: '',
        ossaccessKeyId: '',
        dir: '',
        host: ''
      },
      dialogVisible: false,
      dialogImageUrl: null,
      useOss: true, // 使用 oss -> true; 使用 MinIO -> false
      // ✅ 关键修改：OSS 上传地址指向后端接口
      ossUploadUrl: 'http://localhost:8080/upload/oss',
      minioUploadUrl: 'http://localhost:8080/minio/upload',
    }
  },
  computed: {
    fileList () {
      let fileList = []
      for (let i = 0; i < this.value.length; i++) {
        fileList.push({ url: this.value[i] })
      }
      return fileList
    }
  },
  methods: {
    emitInput (fileList) {
      let value = []
      for (let i = 0; i < fileList.length; i++) {
        value.push(fileList[i].url)
      }
      this.$emit('input', value)
    },
    handleRemove (file, fileList) {
      this.emitInput(fileList)
    },
    handlePreview (file) {
      this.dialogVisible = true
      this.dialogImageUrl = file.url
    },
    beforeUpload (file) {
      // ✅ 关键修改：OSS 模式不再需要获取策略
      if (this.useOss) {
        return true // 直接允许上传（由后端处理）
      }
      // MinIO 模式保持原逻辑
      return true
    },
    handleUploadSuccess (res, file) {
      console.log(res)
      // ✅ 关键修改：统一从 res.data 获取 URL（适配后端返回格式）
      let url = res.data
      this.fileList.push({ name: file.name, url: url })
      this.emitInput(this.fileList)
    },
    handleExceed (files, fileList) {
      this.$message({
        message: '最多只能上传' + this.maxCount + '张图片',
        type: 'warning',
        duration: 1000
      })
    },
  }
}
</script>
<style></style>