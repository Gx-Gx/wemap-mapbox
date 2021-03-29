TMap = window.TMap || {};
if (!TMap.__load) {
    TMap.__load = (onLoad) => {
        onLoad({
            // key: 'NCWBZ-FB3AX-NX34D-75FAS-XHGGK-ZUFNG', // 切换个性化样式
            // key: '6GUBZ-WOJKX-J7H46-7WVQI-E7A66-UTB4X', // 微信开发者工具
            // key: '7PFBZ-AZO3X-Q5J45-ZYOCM-7CLGZ-IBFPG', // totoroxiao
            // key: 'YRHBZ-PXKK6-KAFSN-MEFQH-3QR76-5KF2G',
            // key: '6LLBZ-QMLCX-HNA4L-T3ADN-4O3V5-BFFLB', // 个性化图层联调key,
            // key: 'XVYBZ-3V6KJ-GVYFU-FKLVH-LZVAV-CNFGJ', // 室内平台key
            key: 'ISHBZ-ZKH3F-RNEJ2-NUKSZ-QLRT6-XFF4A', // 室内图key
            // key: 'EAUBZ-J4PRU-JQYVE-B7VGD-TP3JK-APFAI', // 含无效id的key
            // key: 'KDLBZ-3F2KU-BDNVI-2D2XV-362O6-IAFMG', // 首钢
            // key: 'KVZBZ-ID56X-GKT42-TF2ZS-DYTOK-APFGC', // 恒大海花岛
            version: 'debug',
            // highQualityRender: true, // 是否开启高品质渲染（可视化高级功能）
            // satelliteSrc: [
            //   'http://10.61.83.97:8080/sate_watermark'
            // ]
        }, +new Date());
        delete TMap.__load;
    };
}
document.write('<script src="http://127.0.0.1:8081/dist/jsapi.js"></script>');
