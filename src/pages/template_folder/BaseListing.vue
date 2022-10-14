<template>
  <q-card class="bg-blue-10 text-white">
    <h4 class="text-center">Land Well List</h4>
  </q-card>
  <q-table
    class="crp_tbl_format"
    :dense="$q.screen.lt.md"
    title=""
    :loading="tbl_loading"
    :rows="tbl_data"
    :columns="tbl_columns"
    :visible-columns="visible_tbl_columns"
    :row-key="tbl_row_key"
    v-model:pagination="tbl_pagination"
    :filter="advanced_tbl_filters"
    @request="Tblquery"
  >
    <template v-slot:loading>
      <q-inner-loading showing color="blue">
        <q-spinner-audio size="150px" color="blue" />
      </q-inner-loading>
    </template>
    <template v-slot:top-right>
      <div class="q-pa-md q-gutter-sm row justify-end">
        <q-select
          v-model="visible_tbl_columns"
          multiple
          outlined
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="tbl_columns"
          option-value="name"
          options-cover
          style="min-width: 150px"
        />
      </div>
    </template>
    <template v-slot:body-cell-action="props">
      <q-td :props="props">
        <q-btn color="positive" icon="fas fa-edit" no-caps flat dense />
        <q-btn
          color="green"
          icon="fas fa-link"
          no-caps
          flat
          dense
          @click="send_to_details_pg(props.row)"
        >
          <q-tooltip>
            Go to Details Page and look at data in one page
          </q-tooltip>
        </q-btn>

        <q-btn color="negative" icon-right="delete" no-caps flat dense />
      </q-td>
    </template>
  </q-table>
</template>
<script>
//// Base IMPORT
import { reactive, toRefs, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar, date, QSpinnerBars } from "quasar";
//// Base API
import { test_api } from "src/api/test_api";
var api_data_call = test_api;
var api_data_update;
var api_data_delete;
//// Base JS Components
import {
  example_cols,
  example_cols_visible,
} from "src/pages/template_folder/basic_components/tbl_columns";
var default_tbl_cols = example_cols;
var default_tbl_cols_visible = example_cols_visible;
var default_tbl_key = "col1";
//// Base VUE Componets
//// Base Default VUE Composition
export default {
  props: {
    pid: {
      type: [String, Number],
    },
  },
  components: {},
  emits: [],
  setup(props, { attrs, slots, emit }) {
    // Basic SETUP
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
    const event = reactive({
      pid: null,
      tbl_loading: false,
      tbl_data: [],
      tbl_columns: default_tbl_cols,
      visible_tbl_columns: default_tbl_cols_visible,
      tbl_row_key: default_tbl_key,
      advanced_tbl_filters: {},
      tbl_pagination: {
        page: 1,
        rowsPerPage: 8,
      },
      qry_backup: { page: 1, page_size: 8 },
    });
    // Watch BLOCK
    watch(
      () => props.pid,
      () => {
        if (props.pid) {
          event.pid = props.pid;
        }
      }
    );
    // Computed BLOCK
    // OnMounted BLOCK
    onMounted(() => {
      MountFunc();
      onTblDataLoad(event.qry_backup);
    });
    // Function BLOCK
    function MountFunc() {
      if (props.pid) {
        event.pid = props.pid;
      }
    }
    function onTblDataLoad(query) {
      // console.log(props)
      event.tbl_loading = !event.tbl_loading;
      api_data_call(query)
        .then((response) => {
          event.tbl_data = response.data.results;
          event.tbl_pagination.rowsNumber = response.data.count;
          event.tbl_loading = !event.tbl_loading;
        })
        .catch((error) => {
          event.tbl_loading = !event.tbl_loading;
        });
    }
    function Tblquery(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const filter = props.filter;
      var cmb_txt = {};
      sort_txt = "";
      if (filter !== "" && !!filter) {
        cmb_txt["advanced_tbl_filters"] = [filter];
      }
      cmb_txt["page"] = page;
      cmb_txt["page_size"] = rowsPerPage;
      event.tbl_pagination.page = page;
      event.tbl_pagination.rowsPerPage = rowsPerPage;
      event.tbl_pagination.sortBy = sortBy;
      if (descending === true) {
        cmb_txt["ordering"] = sortBy;
      } else {
        cmb_txt["ordering"] = "-" + sortBy;
      }
      event.tbl_pagination.descending = descending;
      // Update Tbl query settings for when modules is changed
      event.qry_backup = cmb_txt;
      onTblDataLoad(cmb_txt);
    }
    function send_to_details_pg() {}
    return {
      ...toRefs(event),
      Tblquery,
    };
  }, // END OF SETUP
};
</script>
<style scoped lang="scss">
@import "src/css/crp_styles.scss";
</style>
