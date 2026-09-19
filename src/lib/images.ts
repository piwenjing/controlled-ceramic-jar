/**
 * 图片资源中心 —— 所有图片 URL 唯一来源
 *
 * 图片资源都托管在阿里云 OSS,迁移后统一走新 bucket (`ligeyuanshan-taoguan.oss-ap-southeast-1.aliyuncs.com`),
 * 修改/替换图片时只需要改这里,组件通过 `import { images } from "@/lib/images"` 引用。
 *
 * 命名规范:每个分组对应页面里的一个 section / 组件,新增 key 时请在注释里写明
 * ① 用在哪个组件  ② 在页面里的具体位置(轮播第几张 / 标签页 / 分类等)
 *
 * ──────────────────────────────────────────────────────────────
 * 当前页面结构(从上到下)
 * ──────────────────────────────────────────────────────────────
 *   HeroSection               ← images.hero
 *   BrandStory                ← images.craftsmanship
 *   CoreAdvantages            ← images.advantages
 *   ProductStructure          ← images.structure
 *   ProductLineup             ← images.products
 *   MediaCarousel (视频tab)    ← 视频在 lib/videos.ts,缩略图引用 images.hero / images.craftsmanship
 *   MediaCarousel (图片tab)    ← images.mediaCarousel
 *   SuccessCases              ← images.successCases
 * ──────────────────────────────────────────────────────────────
 *
 * 2026-09 迁移进度:
 *   ✅ hero.background               → 新 bucket
 *   ✅ structure.diagram1/2 (en)     → 新 bucket(英文版 2 张)
 *   ✅ mediaCarousel.processing       → 新 bucket(7 张)
 *   ✅ mediaCarousel.cases            → 新 bucket(21 张:8 case + 13 success)
 *   ✅ successCases                  → 新 bucket(13 张,合并到 mediaCarousel.cases)
 *   ⏳ advantages / products  → 待迁移
 * ──────────────────────────────────────────────────────────────
 */

// 旧 OSS 加速域名(历史图片,迁移完成后会逐步清空)
const OSS = "https://ligeyuanshan.oss-accelerate.aliyuncs.com";
// 新 OSS bucket(2026-09 起所有新上传 + 迁移到此),东南亚节点 ap-southeast-1
const OSS_N = "https://ligeyuanshan-taoguan.oss-ap-southeast-1.aliyuncs.com";

export const images = {
  /**
   * HeroSection —— 顶部首屏大背景图(全屏 cover)
   * 位置:首屏居中,带暗色遮罩
   */
  hero: {
    background: `${OSS_N}/jar/attach/background.webp`,
  },

  /**
   * ProductStructure —— 产品结构剖面图(Professional Amphora Architecture)
   * 位置:产品结构 section,两张并排展示
   *   diagram1 = 整体剖面
   *   diagram2 = 细节剖面
   * 注:2026-09 项目已只剩英文版,zh 字段已移除
   */
  structure: {
    diagram1: {
      en: `${OSS_N}/jar/attach/product/pic-1-en.webp`,
    },
    diagram2: {
      en: `${OSS_N}/jar/attach/product/pic-2-en.webp`,
    },
  },

  /**
   * BrandStory —— 品牌故事 / 工艺配图(Craftsmanship Process)
   * 位置:BrandStory section 内两张工艺展示图(并排)
   *   process1 = 陶罐泥胚塑形
   *   process2 = 陶罐生产
   * 这两张同时被 MediaCarousel 的"制作过程"分类视频作为 thumbnail 复用
   *
   * ⚠️ 文件名是中文 URL 编码(陶罐泥胚塑形 / 陶罐生产),后续建议改成英文命名
   *    重命名后只改这里 2 行
   */
  craftsmanship: {
    process1: `${OSS_N}/jar/attach/process/%E9%99%B6%E7%BD%90%E6%B3%A5%E8%83%9A%E6%95%B4%E5%BD%A2.webp`,
    process2: `${OSS_N}/jar/attach/process/%E9%99%B6%E7%BD%90%E7%94%9F%E4%BA%A7.webp`,
  },

  /**
   * CoreAdvantages —— 核心优势 section
   * 位置:背景大图叠加 (No Leak 区块的两侧图已删除,不再需要 img2)
   *   img1 = 优势图 1(背景层 <img>)
   *   img3 = 优势图 3(背景层 CSS backgroundImage)
   */
  advantages: {
    img1: `${OSS}/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E4%BC%98%E5%8A%BF1.png`,
    img3: `${OSS}/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E4%BC%98%E5%8A%BF3.png`,
  },

  /**
   * ProductLineup —— 产品阵容 section
   * 位置:Gen 2 大卡片左侧主图
   *   spirits  = 第 0 代
   *   gen1     = 第一代
   *   gen2     = 第二代(中文版)
   *   gen3     = 第三代
   * 非中文版本当前直接硬编码 URL 在 ProductLineup.tsx 里(需要时可抽到此)
   */
  products: {
    spirits: `${OSS}/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E7%AC%AC0%E4%BB%A3.png`,
    gen1: `${OSS}/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E7%AC%AC%E4%B8%80%E4%BB%A3.png`,
    // Gen 2 主图 —— 2026-09 替换(文件名:未命名.webp)
    gen2: `${OSS_N}/jar/attach/%E6%9C%AA%E5%91%BD%E5%90%8D.webp`,
    gen3: `${OSS}/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E7%AC%AC%E4%B8%89%E4%BB%A3.png`,
  },

  /**
   * MediaCarousel —— 媒体中心(视频/图片 轮播)
   * 仅收录图片 tab 下的两个分类,视频归 lib/videos.ts
   *   processing = 加工过程 分类(共 7 张,按数组顺序展示)
   *   cases      = 案例展示 分类(共 18 张,按数组顺序展示)
   * 位置:MediaCarousel section 切到「图片」tab 后,再切加工过程 / 案例展示 子分类时轮播
   */
  mediaCarousel: {
    processing: [
      // 加工过程 — 已 2026-09 迁到新 OSS bucket (ligeyuanshan-taoguan)
      // 数组顺序按运营给的(01, 02, 03, 04, 07, 05, 06),如要按自然 01→07 重排即可
      `${OSS_N}/jar/attach/process/PROCESS01.webp`,
      `${OSS_N}/jar/attach/process/PROCESS02.webp`,
      `${OSS_N}/jar/attach/process/PROCESS03.webp`,
      `${OSS_N}/jar/attach/process/PROCESS04.webp`,
      `${OSS_N}/jar/attach/process/PROCESS07.webp`,
      `${OSS_N}/jar/attach/process/PROCESS05.webp`,
      `${OSS_N}/jar/attach/process/PROCESS06.webp`,
    ],
    cases: [
      // 案例展示 — 已 2026-09 迁到新 OSS bucket (ligeyuanshan-taoguan)
      // 顺序按运营给的(01, 02, 07, 03, 06, 08, 04, 05)
      // ⚠️ 文件名大小写不一致:case01 是小写,CASE02-08 是大写 —— 后续重命名时统一
      `${OSS_N}/jar/attach/CASE/case01.webp`,
      `${OSS_N}/jar/attach/CASE/CASE02.webp`,
      `${OSS_N}/jar/attach/CASE/CASE07.webp`,
      `${OSS_N}/jar/attach/CASE/CASE03.webp`,
      `${OSS_N}/jar/attach/CASE/CASE06.webp`,
      `${OSS_N}/jar/attach/CASE/CASE08.webp`,
      `${OSS_N}/jar/attach/CASE/CASE04.webp`,
      `${OSS_N}/jar/attach/CASE/CASE05.webp`,
      // ── 2026-09 追加:Success Stories section 的 13 张图也合并到此(共用一份数据源)
      // ⚠️ 注意:这些图同时在 MediaCarousel(此处)和 SuccessStories 顶部轮播展示
      //    如果不要重复,把上面 successCases 数组清空,只留 mediaCarousel.cases 一份即可
      `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS01.webp`,
      `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS02.webp`,
      `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS03.webp`,
      `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS04.webp`,
      `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS05.webp`,
      `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS06.webp`,
      `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS07.webp`,
      `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS08.webp`,
      `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS09.webp`,
      `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS10.webp`,
      `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS11.webp`,
      `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS12.webp`,
      `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS13.webp`,
    ],
  },

  /**
   * SuccessCases —— 成功案例 section 顶部轮播图
   * 共 13 张,按数组顺序展示;带 lightbox 点击放大
   * 位置:id="cases" section 顶部,标题/副标题正下方
   *
   * ⚠️ 文件名是 SUCCESS01 ~ SUCCESS13,但 OSS 路径里的目录拼成了
   *    "SUCESS_CASE"(少一个 S),代码里也跟着这个拼写走,后续批量重命名再统一改
   * ⚠️ 数组顺序按运营给的顺序(01, 02, 13, 12, 11, 10, 09, 08, 07, 06, 05, 04, 03)
   *    如果要按自然 01→13 顺序,重排数组即可
   */
  successCases: [
    `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS01.webp`,
    `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS02.webp`,
    `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS13.webp`,
    `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS12.webp`,
    `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS11.webp`,
    `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS10.webp`,
    `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS09.webp`,
    `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS08.webp`,
    `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS07.webp`,
    `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS06.webp`,
    `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS05.webp`,
    `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS04.webp`,
    `${OSS_N}/jar/attach/SUCESS_CASE/SUCCESS03.webp`,
  ],
};