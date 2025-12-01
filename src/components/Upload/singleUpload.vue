<template>
  <div>
    <el-upload
      :action="useOss ? ossUploadUrl : minioUploadUrl"
      :data="useOss ? dataObj : null"
      list-type="picture"
      :multiple="false"
      :show-file-list="showFileList"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="fileList[0].url" alt="">
    </el-dialog>
  </div>
</template>

<script>
// 注意：已移除 policy 导入（不再需要）

export default {
  name: 'singleUpload',
  props: {
    value: String
  },
  computed: {
    imageUrl() {
      return this.value;
    },
    imageName() {
      if (this.value != null && this.value !== '') {
        return this.value.substr(this.value.lastIndexOf("/") + 1);
      } else {
        return null;
      }
    },
    fileList() {
      return [{
        name: this.imageName,
        url: this.imageUrl
      }]
    },
    showFileList: {
      get: function () {
        return this.value !== null && this.value !== '' && this.value !== undefined;
      },
      set: function (newValue) {
      }
    }
  },
  data() {
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
      useOss: true, // 使用 oss -> true; 使用 MinIO -> false
      // ✅ 关键修改：OSS 上传地址指向后端接口
      ossUploadUrl: 'http://localhost:8080/upload/oss',
      minioUploadUrl: 'http://localhost:8080/minio/upload'
    };
  },
  methods: {
    emitInput(val) {
      this.$emit('input', val)
    },
    handleRemove(file, fileList) {
      this.emitInput('');
    },
    handlePreview(file) {
      this.dialogVisible = true;
    },
    beforeUpload(file) {
      // ✅ 关键修改：OSS 模式不再需要获取策略
      if (this.useOss) {
        return true // 直接允许上传（由后端处理）
      }
      // MinIO 模式保持原逻辑
      return true
    },
    handleUploadSuccess(res, file) {
      this.showFileList = true;
      this.fileList.pop();

      // ✅ 关键修改：统一从 res.data 获取 URL（适配后端返回格式）
      let url = res.data;

      this.fileList.push({ name: file.name, url: url });
      this.emitInput(this.fileList[0].url);
    }
  }
}
</script>

<style>
</style>
