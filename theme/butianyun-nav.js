/* ==========================================================================
 * 补天云网站 - 共享导航/页头/页脚/面包屑组件
 * 使用方式：HTML 页面提供占位符
 *   <div data-site-header></div>
 *   <div data-site-breadcrumb></div>
 *   <div data-site-footer></div>
 * 该脚本将自动根据页面路径与 data-* 属性注入内容：
 *   - data-page-title : 当前页标题
 *   - data-breadcrumb : 可选；用 > 分隔面包屑节点，"node /path" 表示带链接，纯 label 表示仅文本
 * ========================================================================== */
(function (global) {
    'use strict';

    /* ---------- 导航配置（单源真相） ---------- */
    var NAV_ITEMS = [
        { id: 'home', label: '首页', path: 'index.html' },
        {
            id: 'cv',
            label: '视觉实践产品',
            path: 'cv/index.html',
            children: [
                { label: 'A 系列 - 应用实践软件', path: 'cv/butianyun-cv-series-a/index.html' },
                { label: 'B 系列 - 传统算法软件', path: 'cv/butianyun-cv-series-b/index.html' },
                { label: 'C 系列 - 网络算法软件', path: 'cv/butianyun-cv-series-c/index.html' },
                { label: 'A 系列手册（扫描PDF）', path: 'cv/butianyun-cv-series-a/manual/index.html' }
            ]
        },
        {
            id: 'course',
            label: '视频课程',
            path: 'course/index.html',
            children: [
                { label: 'QT5 系列课程', path: 'course/butianyun-qt5-series-course/index.html' },
                { label: 'QT6 系列课程', path: 'course/butianyun-qt6-series-course/index.html' },
                { label: '网络编程系列课程', path: 'course/butianyun-network-series-course/index.html' },
                { label: '计算机视觉系列课程', path: 'course/butianyun-cv-series-course/index.html' }
            ]
        },
        {
            id: 'product',
            label: '软件产品',
            path: 'product/index.html',
            children: [
                { label: '火鸟视频创作软件', path: 'product/butianyun-wemedia-studio/index.html' },
                { label: '火鸟博客创作软件', path: 'product/butianyun-blog-studio/index.html' },
                { label: '三维重建软件', path: 'product/butianyun-reconstruction/index.html' },
                { label: '动作教练软件', path: 'product/butianyun-action-exercise/index.html' }
            ]
        },
        { id: 'about', label: '联系我们', path: 'about/index.html' }
    ];

    /* ---------- 工具：计算相对路径前缀 ---------- */
    function getPathInfo() {
        var pathname = window.location.pathname || '';
        // 去除尾部的 index.html
        pathname = pathname.replace(/index\.html?$/, '');
        var segments = pathname.split('/').filter(function (s) { return s.length > 0; });
        var depth = Math.max(0, segments.length - 1);
        var prefix = depth === 0 ? '' : new Array(depth + 1).join('../');
        // 当前页面（无前缀）路径，用于高亮判断
        var currentRel = segments.length ? segments[segments.length - 1] + '/index.html' : 'index.html';
        return { depth: depth, prefix: prefix, currentRel: currentRel };
    }

    /* ---------- 工具：转义 ---------- */
    function escapeHtml(s) {
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    /* ---------- 渲染 header ---------- */
    function renderHeader(info) {
        var p = info.prefix;
        var logoSrc = p + 'about/butianyun.com.png';
        var homeHref = p + 'index.html';

        var html = ''
            + '<header class="site-header">'
            +   '<div class="site-header-inner">'
            +     '<a class="site-brand" href="' + homeHref + '" aria-label="补天云 主页">'
            +       '<img class="site-brand-logo" src="' + logoSrc + '" alt="补天云 LOGO">'
            +       '<span class="site-brand-name">补天云 <span class="site-tagline">补天云视觉实践 / 补天云QT视频课程 / 补天云其它软件产品</span></span>'
            +     '</a>'
            +   '</div>'
            +   '<nav class="main-nav" aria-label="主导航">'
            +     '<div class="main-nav-inner">'
            +       '<ul class="main-nav-list">';

        for (var i = 0; i < NAV_ITEMS.length; i++) {
            var item = NAV_ITEMS[i];
            var href = p + item.path;
            var isCurrent = item.path === info.currentRel;
            // 子项包含当前路径时也激活父项
            var isParentOfCurrent = false;
            if (item.children && item.children.length) {
                for (var c = 0; c < item.children.length; c++) {
                    if (item.children[c].path === info.currentRel) {
                        isParentOfCurrent = true;
                        break;
                    }
                }
            }
            var active = isCurrent || isParentOfCurrent;
            var activeClass = active ? ' is-active' : '';
            var hasChildren = item.children && item.children.length;
            var subClass = hasChildren ? ' has-submenu' : '';

            html += ''
                + '<li class="main-nav-item' + subClass + '">'
                +   '<a class="main-nav-link' + activeClass + '" href="' + href + '">' + escapeHtml(item.label) + '</a>';

            if (hasChildren) {
                html += '<ul class="main-nav-submenu">';
                for (var k = 0; k < item.children.length; k++) {
                    var child = item.children[k];
                    var childHref = p + child.path;
                    var childActive = child.path === info.currentRel ? ' is-active' : '';
                    html += '<li class="main-nav-subitem">'
                          +   '<a class="main-nav-sublink' + childActive + '" href="' + childHref + '">' + escapeHtml(child.label) + '</a>'
                          + '</li>';
                }
                html += '</ul>';
            }
            html += '</li>';
        }

        html += ''
            +       '</ul>'
            +     '</div>'
            +   '</nav>'
            + '</header>';
        return html;
    }

    /* ---------- 渲染面包屑 ---------- */
    function renderBreadcrumb(info, pageTitle) {
        var p = info.prefix;
        var explicit = document.body && document.body.getAttribute('data-breadcrumb');
        var segments;

        if (explicit) {
            // 形如 "首页 > 视觉实践产品 > A 系列"
            segments = explicit.split('>').map(function (s) { return s.trim(); }).filter(function (s) { return s.length; });
        } else {
            // 根据 currentRel 在 NAV_ITEMS/children 中查找路径
            segments = ['首页'];
            var foundItem = null, foundChild = null;
            for (var i = 0; i < NAV_ITEMS.length; i++) {
                if (NAV_ITEMS[i].path === info.currentRel) {
                    foundItem = NAV_ITEMS[i];
                    break;
                }
                if (NAV_ITEMS[i].children) {
                    for (var c = 0; c < NAV_ITEMS[i].children.length; c++) {
                        if (NAV_ITEMS[i].children[c].path === info.currentRel) {
                            foundItem = NAV_ITEMS[i];
                            foundChild = NAV_ITEMS[i].children[c];
                            break;
                        }
                    }
                    if (foundItem) break;
                }
            }
            if (foundItem) {
                segments.push(foundItem.label);
                if (foundChild) {
                    segments.push(foundChild.label);
                }
            } else if (pageTitle) {
                segments.push(pageTitle);
            }
        }

        var html = '<div class="breadcrumb"><div class="site-container"><ol class="breadcrumb-list">';
        for (var i = 0; i < segments.length; i++) {
            var isLast = i === segments.length - 1;
            if (isLast) {
                html += '<li class="breadcrumb-item"><span class="breadcrumb-current">' + escapeHtml(segments[i]) + '</span></li>';
            } else if (i === 0) {
                html += '<li class="breadcrumb-item"><a href="' + p + 'index.html">' + escapeHtml(segments[i]) + '</a></li>';
            } else {
                html += '<li class="breadcrumb-item"><span>' + escapeHtml(segments[i]) + '</span></li>';
            }
        }
        html += '</ol></div></div>';
        return html;
    }

    /* ---------- 渲染 footer ---------- */
    function renderFooter(info) {
        var p = info.prefix;
        var links = [
            { label: '首页', path: 'index.html' },
            { label: '视觉实践产品', path: 'cv/index.html' },
            { label: '视频课程', path: 'course/index.html' },
            { label: '软件产品', path: 'product/index.html' },
            { label: '联系我们', path: 'about/index.html' }
        ];
        var html = ''
            + '<footer class="site-footer">'
            +   '<div class="site-footer-inner">'
            +     '<ul class="footer-links">';
        for (var i = 0; i < links.length; i++) {
            html += '<li><a href="' + p + links[i].path + '">' + escapeHtml(links[i].label) + '</a></li>';
        }
        html += ''
            +     '</ul>'
            +     '<div class="footer-copy">© 补天云 BUTIANYUN.COM 版权所有</div>'
            +   '</div>'
            + '</footer>';
        return html;
    }

    /* ---------- 挂载函数 ---------- */
    function mount() {
        var info = getPathInfo();
        var pageTitle = (document.body && document.body.getAttribute('data-page-title')) || '';

        var headerSlot = document.querySelector('[data-site-header]');
        if (headerSlot) headerSlot.outerHTML = renderHeader(info);

        var crumbSlot = document.querySelector('[data-site-breadcrumb]');
        if (crumbSlot) crumbSlot.outerHTML = renderBreadcrumb(info, pageTitle);

        var footerSlot = document.querySelector('[data-site-footer]');
        if (footerSlot) footerSlot.outerHTML = renderFooter(info);
    }

    // 暴露 API
    global.ButianyunNav = {
        mount: mount,
        NAV_ITEMS: NAV_ITEMS,
        renderHeader: renderHeader,
        renderBreadcrumb: renderBreadcrumb,
        renderFooter: renderFooter,
        getPathInfo: getPathInfo
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount);
    } else {
        mount();
    }
})(window);