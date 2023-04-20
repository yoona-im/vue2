<template>
  <div class="p16 h0100">
    <div class="top">
      <div class="flex mb16">
        <el-input
          class="w300"
          v-model="keyword"
          placeholder="请输搜索内容"
          @keyup="queryConfData"
        />
        <div>
          <el-button>同步</el-button>
          <el-button type="primary">新增</el-button>
        </div>
      </div>
    </div>
    <el-table
      :data="tableData"
      size="small"
      header-cell-class-name="header_cell_style"
      cell-class-name="cell_style"
      row-key="id"
      empty-text="暂无数据"
      height="calc(100% - 42px)"
    >
      <el-table-column
        prop="key"
        label="配置项"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="domain" label="域"></el-table-column>
      <el-table-column prop="ip" label="IP"></el-table-column>
      <el-table-column
        prop="value"
        label="配置值"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="desc"
        label="描述"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="system"
        label="权限"
        v-if="isSystemUser"
        width="100"
      >
        <template slot-scope="scope">
          <span
            class="permission_tag"
            :style="getPermisssionTagStyle(scope.row.system)"
          >
            <!-- {{ scope.row.system | dictNameFilter(PermisssionEnum) || "未知" }} -->
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" v-else width="100">
        <template #default="scope">
          <span
            class="co_blue hand mr8"
            @click="handleTable('edit', scope.row)"
            v-show="getButtonShow('edit', scope.row.system)"
          >
            编辑
          </span>
          <span
            class="co_blue hand"
            @click="deleteConfig(scope.row)"
            v-show="getButtonShow('detele', scope.row.system)"
          >
            删除
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { Search } from "@element-plus/icons-vue";
import { onMounted, ref, reactive } from "vue";
import { queryConfList } from "../api/service";
import { PermisssionEnum } from "../enums/enums.m";
//
let isSystemUser = ref(false);
let PermisssionOptions = reactive(PermisssionEnum);
// 表格
let keyword = ref("");
let tableData = ref([]);
let loading = ref(false);

const queryConfData = () => {
  const params = {
    key: keyword.value,
  };
  loading.value = true;
  queryConfList(params)
    .then((res) => {
      const { code, body: data } = res;
      if (code === 200) {
        tableData.value = data;
      }
      loading.value = false;
    })
    .catch((e) => {
      loading.value = false;
      console.log(e.message);
    });
};

// 获取颜色
const getPermisssionTagStyle = (system) => {
  switch (system) {
    case this.PermisssionEnum.READONLY.code:
      return {
        color: colorMap.grey,
        backgroundColor: colorMap.greyBg,
      };
    case this.PermisssionEnum.READWRITE.code:
      return {
        color: colorMap.blue,
        backgroundColor: colorMap.blueBg,
      };
    case this.PermisssionEnum.ALL.code:
      return {
        color: colorMap.green,
        backgroundColor: colorMap.greenBg,
      };
    case this.PermisssionEnum.HIDE.code:
      return {
        color: colorMap.orange,
        backgroundColor: colorMap.orangeBg,
      };
    default:
      return {
        color: colorMap.red,
        backgroundColor: colorMap.redBg,
      };
  }
};

const handleTable = () => {};

const getButtonShow = () => {};

onMounted(() => {
  queryConfData();
});
</script>
<style></style>
