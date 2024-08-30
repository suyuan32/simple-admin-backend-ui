<template>
  <AList :class="prefixCls" bordered :pagination="getPagination">
    <template v-for="item in getData" :key="item.id">
      <AListItem class="list-item">
        <AListItemMeta>
          <template #title>
            <div class="title">
              <a-typography-paragraph
                @click="handleTitleClick(item)"
                style="width: 100%; margin-bottom: 0 !important"
                :style="{ cursor: isTitleClickable ? 'pointer' : '' }"
                :delete="!!item.titleDelete"
                :ellipsis="
                  props.titleRows && props.titleRows > 0
                    ? { rows: props.titleRows, tooltip: !!item.title }
                    : false
                "
                :content="item.title"
              />
              <div class="extra" v-if="item.extra">
                <ATag class="tag" :color="item.color">
                  {{ item.extra }}
                </ATag>
              </div>
            </div>
          </template>

          <template #avatar>
            <AAvatar v-if="item.avatar" class="avatar" :src="item.avatar" />
            <span v-else> {{ item.avatar }}</span>
          </template>

          <template #description>
            <div>
              <div class="description" v-if="item.description">
                <a-typography-paragraph
                  style="width: 100%; margin-bottom: 0 !important"
                  :ellipsis="
                    props.descRows && props.descRows > 0
                      ? { rows: props.descRows, tooltip: !!item.description }
                      : false
                  "
                  :content="item.description"
                />
              </div>
              <div class="datetime">
                {{ item.datetime }}
              </div>
            </div>
          </template>
        </AListItemMeta>
      </AListItem>
    </template>
  </AList>
</template>
<script lang="ts" setup>
  import { computed, PropType, ref, watch, unref } from 'vue';
  import { ListItem } from './data';
  import { useDesign } from '@/hooks/web/useDesign';
  import { List, Avatar, Tag, Typography } from 'ant-design-vue';
  import { isNumber } from 'remeda';

  // types
  import type { StyleValue } from '@/utils/types';
  import type { FunctionalComponent } from 'vue';
  import type { ParagraphProps } from 'ant-design-vue/es/typography/Paragraph';

  const AListItem = List.Item;
  const AList = List;
  const AAvatar = Avatar;
  const ATag = Tag;

  const AListItemMeta = List.Item.Meta;

  const ATypographyParagraph = Typography.Paragraph as FunctionalComponent<
    ParagraphProps & {
      style?: StyleValue;
    }
  >;

  const props = defineProps({
    list: {
      type: Array as PropType<ListItem[]>,
      default: () => [],
    },
    pageSize: {
      type: [Boolean, Number] as PropType<Boolean | Number>,
      default: 5,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    titleRows: {
      type: Number,
      default: 1,
    },
    descRows: {
      type: Number,
      default: 2,
    },
    onTitleClick: {
      type: Function as PropType<(Recordable) => void>,
    },
  });

  const emit = defineEmits(['update:currentPage']);

  const { prefixCls } = useDesign('header-notify-list');
  const current = ref(props.currentPage || 1);
  const getData = computed(() => {
    const { pageSize, list } = props;
    if (pageSize === false) return [];
    let size = isNumber(pageSize) ? pageSize : 5;
    return list.slice(size * (unref(current) - 1), size * unref(current));
  });
  watch(
    () => props.currentPage,
    (v) => {
      current.value = v;
    },
  );
  const isTitleClickable = computed(() => !!props.onTitleClick);
  const getPagination = computed(() => {
    const { list, pageSize } = props;

    // compatible line 104
    // if typeof pageSize is boolean, Number(true) && 5 = 5, Number(false) && 5 = 0
    const size = isNumber(pageSize) ? pageSize : Number(pageSize) && 5;

    if (size > 0 && list && list.length > size) {
      return {
        total: list.length,
        pageSize: size,
        current: unref(current),
        onChange(page) {
          current.value = page;
          emit('update:currentPage', page);
        },
      };
    } else {
      return false;
    }
  });

  function handleTitleClick(item: ListItem) {
    props.onTitleClick && props.onTitleClick(item);
  }
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-header-notify-list';

  .@{prefix-cls} {
    &::-webkit-scrollbar {
      display: none;
    }

    ::v-deep(.ant-pagination-disabled) {
      display: inline-block !important;
    }

    .list-item {
      padding: 6px;
      overflow: hidden;
      transition: all 0.3s;
      cursor: pointer;

      .title {
        margin-bottom: 8px;
        font-weight: normal;

        .extra {
          margin-top: -1.5px;
          margin-right: 0;
          float: right;
          font-weight: normal;

          .tag {
            margin-right: 0;
          }
        }
      }

      .avatar {
        margin-top: 4px;
      }

      .description {
        font-size: 12px;
        line-height: 18px;
      }

      .datetime {
        margin-top: 4px;
        font-size: 12px;
        line-height: 18px;
      }
    }
  }
</style>
