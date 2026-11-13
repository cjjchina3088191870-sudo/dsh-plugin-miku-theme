# 发布验证

运行目标：DSH 0.2.1-rc.5 / Node.js 22 或更新版本。

- 初音欢迎页、对话页、浅色及深色、360×639 和 390×844 手机尺寸已在真实 DSH 页面检查。
- 新会话图标居中、顶部按钮位于边框内、输入框底部间距约 14px。
- 主题切换清理旧呈现，保留草稿及原生编辑器，装饰层不拦截点击。
- 发布前新增管理器首次安装检查：只安装初音、只安装管理器、已保存的缺失主题，以及延迟加载的主题提供者。
- 主题预览见 `preview/`（初音包）。

发布包包含构建结果与资源，不包含本机账号、凭据、会话或开发环境配置。


## 手机导航与输入框 · 2026-11-05

final result: passed

在 DSH 0.2.2-rc.1 上，初音 0.2.4 配合管理器 0.1.5 已检查角标抽屉与纵向图标栏、独立主题偏好、原生界面恢复和桌面布局恢复。手机输入框在 360px、393px 宽度下检查了五个主按钮的对齐及边界；模型、权限和编辑操作保留原生行为。可移植的手机截图见 [角标导航](preview/mobile-corner.png) 与 [纵向导航](preview/mobile-rail.png)。物理手机软键盘及辅助技术未单独审计。


### 2026-11-07 · 电脑与手机启动视频

H.264 1280×720 MP4 与 270×480 WebM 已在 Chromium 桌面及 393×760 手机视口验证上传、预览、启动选择和手机单独重置。禁用本地 Blob 预览后仍可上传正常 MP4；手机未上传时沿用电脑视频，两端显示方式独立。v1 数据迁移保留文件、修订号和声音设置；哈希清理保留另一屏幕仍在使用的视频。核心 20 项及两款主题各 6 项检查通过。手机结果为浏览器模拟视口，未代替真实设备验证。


### 2026-11-07 · 启动片段的备用编码

内置片段增加 VP8/Opus WebM，与原 MP4 保持同一内容；上传相同文件时通过内容哈希匹配备用编码。浏览器可以选择可用编码，媒体加载失败会尝试另一源，预览不再自动跳到 0.8 秒。核心 22 项通过；通过 HTTPS 网关访问已保存的视频，桌面和手机模拟视口均确认时间前进及可见动画，并验证屏蔽 WebM 后 MP4 回退仍正常。尚未在用户出现故障的实际设备上复现其原始错误。


### 2026-11-07 · 双主题发布套装

初音未来与原创虚拟玫瑰女王由单个安装包提供。仅替换玫瑰人物、照片、品牌文字与对应英文签名，其他装饰和布局沿用既有设计。隔离配置仅安装一个主题包，已检查两款主题的目录与素材服务、主题切换，以及玫瑰浅色、深色、手机布局。原人物图片未包含在发布包中。部署环境与原本地工作目录保持 0.3.2，不部署本发布版到现有 DSH。


## Skirk · Stellar Orbit — 2026-11-12

Source targets: accepted desktop home exec-c96a2a4d, dual-figure chat exec-d5b47de8, phone chat exec-207f8152 and phone home exec-c52936b4 in the current thread's generated_images directory.

Evidence: work/skirk-qa/live-wide-home.png, live-wide-chat-private.png, live-mobile-home.png, live-mobile-chat-private.png. Source/implementation were viewed together in mobile-home-comparison.png and chat-comparison-private.png. Desktop conversation comparison normalizes the 2560×1440 capture to the source's 16:9 aspect; phone comparison uses 390×844 logical pixels. Conversation text differs because the capture uses a real existing session. Private conversation captures are not publication assets.

Findings and fixes:
- P1 fixed: initial full-width reading-region tint dimmed both character layers. Moved the reading surface to the centered native message column; character layers retain full contrast.
- P2 fixed: phone composer initially inherited a single compressed control row. Added a dedicated native model/reasoning row above the attachment/access/microphone/send row.
- P2 fixed: phone home had excess space beneath the input. The home stack now follows the available visual viewport; final phone composer ends at y≈830 in an 844px viewport.
- P2 fixed: desktop full-body figures initially sat too low. Revised their cover/crop geometry to frame the transcript with visible faces.
- P2 fixed: closed desktop sidebar left a workspace header visible. Closed drawer descendants are now hidden; native session rows remain reachable through the rail.

Required fidelity surfaces:
- Typography: Chinese display text uses installed Noto Serif CJK SC; native UI/input remains readable at 14–16px. Native menu text and long provider names retain host behavior.
- Layout: left artwork/right home composition, centered wide-screen transcript with two independently layered figures, phone full-width message flow and bottom composer. Desktop and phone have no horizontal overflow.
- Color/tokens: midnight navy and violet, silver crystalline edging, cyan accents. Skirk is intentionally a dark art direction under either host appearance mode; Rose/Miku retain their existing light/dark behavior.
- Artwork: separately generated transparent seated/standing figures and frame; generated abyss background. No screenshot used as an interface surface. Standard Tabler icons are used with MIT attribution.
- Content: native DSH session title, messages, model picker, reasoning controls, access controls, attachments and toolbar extensions remain functional. Home shortcuts insert into the revision-guarded native draft API.

Intentional native-product differences: the source mock's fictional top session-tab strip is not duplicated; the actual DSH conversation header and available actions are preserved. Model and reasoning are shown through the host's existing combined picker. Disabled send remains visually disabled. Phone artwork uses the generated matching pose rather than cropping the concept image.

Remaining P3: crystal corner ornaments can be further tuned; the desktop home title wraps differently at intermediate widths; the phone home omits the tiny secondary seated silhouette from the concept. These do not block use.

Validation: 13 local theme tests passed, including Skirk lifetime cleanup, single active provider, separate asset allowlists and path restrictions. Actual installed DSH passed wide and phone browser checks, model menu opening, draft shortcut insertion, three-way switching, phone rail and drawer operation; no page errors or horizontal overflow. Existing Rose/Miku artwork manifests match the retained 0.3.2 packages. Original personal artwork is confined to the local version; the public preparation retains Rose Queen.

final result: passed


## Skirk fidelity correction — revision 2

The previous pass was too permissive about the desktop headline, shortcut rows, input proportions and hardcoded rail. These were treated as P1/P2 issues in this revision and corrected against the user-selected concept.

Source: codex-clipboard-388d9301-15bb-40c0-bd4f-09634dfa8bcb.png. Live 1487×1058 capture: work/skirk-qa/v2-live-reference-home.png. Combined source/live evidence: v2-live-comparison.png. Narrow-right-panel evidence: v2-reference-right-panel.png. Phone regression evidence: v2-live-mobile-home.png.

Corrected fidelity surfaces:
- Typography: shipped a 15KB OFL Noto Serif CJK SC subset to prevent platform-dependent title fonts. The headline is a single skewed serif line, with an ice-blue second phrase; the spaced signature and fine rules are below it. The extra desktop subtitle is removed.
- Layout: measured scene-relative anchors replace the previous flex arrangement: title ≈49.9%/14.3%, shortcuts ≈52.5%/30.9%, input ≈38.5%/56.5% with ≈59.4% scene width and ≈29.4% height. In the real reference-sized native shell the input is 834×285 at (616.5,636.9), accounting for the narrower real rail and shorter real header.
- Color/material: translucent indigo six-corner rows, silver/lavender outlines, blue-violet faceted input interior, enlarged crystalline corners and a cyan/amethyst send-button plate. Native disabled-send behavior remains visible.
- Images: independently generated alpha frame and row assets, opaque low-contrast input material and gemstone send plate. No screenshot is used as a control surface.
- Copy: all three desktop shortcut descriptions match the selected concept. Their native draft insertion actions remain functional.

Navigation and real controls:
- Rail dynamically mirrors every native sidebar panel row and live state; actual Plugins, Automation, Aurabot and More were present in browser verification.
- The native session-only flyout has no duplicate brand/new action/global panel list. Only a structurally blank new-session placeholder is hidden; user-created sessions named New session are retained.
- Recent-session strip uses real native session IDs and click handlers. It sits below the native header, leaving the original top-right controls accessible.
- More/account popups retain native ownership. Proxy anchoring preserves their geometry; CSS position-visibility is overridden only while a proxy popup is active so the hidden native anchor does not suppress painting/hit-testing.
- Verified actual More menu, Aurabot navigation, and opening native Settings from Aurabot. Right panel was opened with its native button: the narrowed workspace rearranges to a full reading/input column (input about647px wide instead of436px).

Validation: 15 theme tests passed after introducing navigation; its final two lifecycle/navigation tests passed again after the popup fix. Source previews had no page errors. Installed 0.3.4 was checked again at reference and phone sizes; account→Settings succeeded. Only dsh-plugin-miku-theme changed installed version (0.3.3→0.3.4). Independent pets/widgets were hidden only in QA capture contexts, not in the installed theme.

Remaining P3: artwork poses are generated interpretations of the selected Skirk illustration; exact crystal facet placement differs from the concept. Native menus, providers and model/reasoning controls retain their real available content instead of the concept's sample data.

final result: passed




Source: the user's desktop 1487×1058 and mobile 591×1280 concepts attached on 2026-11-13. Mobile comparison normalizes the source to 390×844. This extends the real DSH plugin, retaining the native editor, draft insertion, model/reasoning menu, permissions, attachments, native corners and third-party panel entries.

The previous revision had material P2 differences: wrong character pose, missing crystal disk, a nearly black phone background, understated selected tabs/rail, an over-tall phone composer and an unstyled session drawer. These were reopened, rather than treating the earlier visual pass as sufficient.

Fixes: reference-guided transparent open-palm hero; separate desktop and phone starfields; measured title/signature/shortcut placement; active native session and new-draft states; crystal rail, menu and drawer; two glass surfaces inside the native combined model/reasoning picker; gemstone send affordance. Phone home composer reduced from 210px to about181px. Phone chat with third-party credit controls is about193px.

Visual evidence: outputs/skirk-theme/v3/desktop-comparison.jpg and mobile-comparison.jpg (reference and rendered app together). Actual captures: work/skirk-qa/v3-reference-home.png, v3-mobile-home.png, v3-mobile-rail.png, v3-mobile-drawer.png, and private chat captures kept outside the package. Public preview captures replace session labels only for screenshots. Real UI still delegates to the user's actual native rows.

At 1487×1058 the scene starts after a 58px header and50px recent strip. The title is at about(791,244); shortcut rows start at(826,402), width584px; the composer card is at(644,645), height279px, with a crystal rim extending outside it. At390×844 the first shortcut is aroundy394, workspace aroundy521, and the shorter composer aroundy588. Width, sidebar expansion and native-right-panel reflow were inspected.

Functional evidence: 16 focused tests pass, including provider lifecycle/cleanup, artwork allowlists, native workspace delegation, real selected-session transition, dynamic plugin rail entries and stable sync. Browser checks cover native draft insertion, model menu, workspace menu, More/Aurabot/account-to-settings, native right panel and both phone navigation modes. No browser page errors were observed.

Remaining P3 differences: reconstructed hair/occluded costume edges are not pixel-identical to the source; DSH exposes model and effort via a single combined menu, so the two visual surfaces share that native handler; actual native workspace/agent controls and installed plugin entries remain visible in place of the concept's demo-only controls. Header ornament and individual star/facet details vary from the generated concept.

final result: passed

Local installed validation: 0.3.5, desktop/phone live rendering and native menus passed without source-preview routes. Public three-theme bundle test passes.


## 2026-11-13 — compact phone controls, readable menus and art lettering (local0.3.6)

The user's reported menu screenshot was compared with a real native mode menu at390×692; the accepted mobile concept was compared beside the revised390×844home. Evidence: outputs/skirk-theme/v4/menu-comparison.jpg and mobile-comparison.jpg.

Fixed P2: new DSH menu materials use --dsw-menu-surface-fill, which was missing from the legacy-token-derived Skirk palette. It now explicitly uses #20233ff5 in both host appearances. Real light/dark menu surfaces compute rgba(32,35,63,.96), titles#f0efff and descriptions#b3b7db. Estimated description contrast is7.80 normally and5.91 onhover, above4.5; the native selector and selection handlers remain intact.

Fixed phone layout: at390×844, the three34px shortcuts have10px gaps and end at537px. The workspace/mode row starts at549px, leaving12px above it, and ends at579px,9px before the588px composer. Its181px height remains. At390×692, the same layout adapts to a166px composer, retaining those12px/9px gaps. Both corner/drawer and vertical-rail navigation were inspected. Desktop composition is retained.

The Chinese heading now uses two separate transparent silver/ice-cyan ImageGen lettering fragments with shallow bevels and oblique Song/Ming strokes. Correct wording and punctuation were checked. Both desktop inline and phone two-line compositions preserve the original H1 accessible text; non-Chinese labels retain the text fallback. The slightly stronger embossed edges relative to the concept remain a P3 stylistic difference. Asset sources/prompts: assets/skirk/TITLE-ART-PROMPTS.md.

Validation:16 focused tests pass. Browser checks verified actual mode-menu colors under light and dark host appearances,390×844/390×692 phone layouts, the rail layout, desktop typography and no page errors.

final result: passed

Installed check: local0.3.6 loaded after restarting dsh-integrated.service. Authenticated desktop and phone browser checks used the installed plugin without source routes. Both title assets decoded successfully, actual native mode-menu material/color values matched the fix, no page errors were observed. Only dsh-plugin-miku-theme changed installedversion.


## 2026-11-13 — first-session resident composer transition

Root cause: DSH ConversationContent keeps the composerStack/inputBar DOM mounted while changing from home to the first active session. Home-only theme data attributes remained on the reused nodes; the observers only reacted to child insertions/removals and could also miss an isolated native data-phase change. Existing refresh/open-existing-session checks did not cover this first-session path.

Fixed across Miku, original local Rose and Skirk: native phase takes precedence over retained brand descendants; home-only attribute leases and sizing styles are restored as the phase changes; detached nodes are restored before forgetting them; native data-phase/class changes schedule sync. Skirk also scopes home positioning CSS to its welcome state. Native editor, card, draft and caret ownership remain with DSH.

Meaningful regressions cover same-node phase-only home→active→home, retained brand, same editor/caret, transcript visibility, detach/reattach, sizing restoration, full cleanup and absence of an ongoing observer loop. Frame settlement uses real animation-frame ticks rather than fixed short sleeps. Full parallel local suites: Miku17/17, Rose7/7.

Browser evidence: work/skirk-qa/v5-transition-browser.json and v5-transition-browser.cjs. Six cases (three skins × desktop1487×1058/phone390×844) pass, including the return home. Every case retains the exact native editor/card objects, removes home marks/styles and exposes the transcript. Skirk desktop card moves from home x644/w799 to chat x382/w819. These are source-grounded native DOM branch simulations, not actual model sends; no production messages were created.

final result: passed


## Publication Rose Queen identity refresh

Only the public bundle's figure, chat and polaroid assets changed to one original adult Chinese-faced cute character, black/chestnut hair, pearl/rose crown and blush/ivory lace dress. Transparent outer layers, the lifted stage placement, floral backgrounds and the polaroid caption/frame remain. Actual light/dark desktop1440×960 and phone390×844 captures loaded both new hashes successfully, no browser errors; public labels remain Rose Queen with no local Hashimoto identity. Legacy Queen figure/photo hashes were removed from the manifest/runtime and return404. The local original Rose figure/photo manifest is unchanged.

Visual evidence: outputs/rose-cute-release/desktop.png, mobile.png, figure.png, photo.png. Generated via built-in ImageGen; exact prompts are in themes/rose/assets/GENERATION-CUTE-CHINESE.md. Current public README and previews describe/show the new character.

final result: passed

Installed verification: dsh-integrated.service restarted with localMiku/Skirk0.3.7 andoriginalRose0.3.4. All six installed real-DOM transition cases passed with no source-bundle routing (work/skirk-qa/v5-transition-live.json): same native editor/card, no stale home marks, no browser errors, successful return home. Installed original Rose art hashes remain unchanged. Public0.4.1 bundle containing the new cute character is packaged separately; this task did not push GitHub or publish npm.
