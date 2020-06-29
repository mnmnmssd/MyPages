//默认显示时间戳
var defult_date =
    new Date().getHours() +
    ":" +
    new Date().getMinutes() +
    ":" +
    new Date().getSeconds();

//获取访问者的IP
var ip = returnCitySN['cip'];
//利用腾讯地图API接口返回访问者所在城市
var city_url = "https://apis.map.qq.com/ws/location/v1/ip?ip=";
//请在https://lbs.qq.com 申请专属key
var key;

//利用看云API获取天气
var weather_url = "https://www.tianqiapi.com/free/day?";
//请在 https://www.tianqiapi.com/ 获取专属appid与appkey
var appid;
var appkey;

//一言接口
var onewords_url = "https://v1.hitokoto.cn/"

//壁纸接口
var syxzImg_url = "https://img.xjh.me/random_img.php?return=json&type=bg&ctype=nature" //ctype可选属性 acg/nature 分别为动漫与风景
// var syxz_url = "https://cn.bing.com"
var PiG_img = {
    url: null
};

var vm = new Vue({
    el: "#bg",
    data() {
        return {
            timer: "",
            date: defult_date,
            year: new Date().getFullYear(),
            city: "city_name",
            weather: "weather",
            onewords: "一言提供接口",
            one_word_user: "一言",
            name1: "blog", //链接名称
            name2: "demo",
            name3: "about",
            beian: "", //备案号
            banquan: "", //版权信息
            app: {
                backgroundImage: 'url(' + PiG_img.url + ')'
            }
        }
    },
    created() {
        var _this = this;
        this.timer = setInterval(() => {
            _this.date =
                new Date().getHours() +
                ":" +
                (new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes()) +
                ":" +
                (new Date().getSeconds() < 10 ? "0" + new Date().getSeconds() : new Date().getSeconds());
            _this.year =
                new Date().getFullYear() +
                "-" +
                (new Date().getMonth() + 1) +
                "-" +
                new Date().getDate();
        }, 1000);

        axios.get('static/config.json')
            .then(res => {
                key = res.data.key;
                appid = res.data.appid;
                appkey = res.data.appkey;
                _this.beian = res.data.beian;
                _this.banquan = res.data.banquan;
                init();
            })
            .catch(err => {
                console.error(err);
            })

        var init = () => {
            axios.get(weather_url + "appid=" + appid + "&appsecret=" + appkey + "&ip=" + ip)
                .then(res => {
                    _this.weather = res.data.wea + " " +
                        "当前温度:" + res.data.tem + "℃ " +
                        "白天温度:" + res.data.tem_day + "℃ " +
                        "夜间温度:" + res.data.tem_night + "℃";
                })
                .catch(err => {
                    console.error(err);
                })
            axios.get(city_url + ip + "&key=" + key)
                .then(res => {
                    _this.city = res.data.result.ad_info.city;
                })
                .catch(err => {
                    console.error(err);
                })
        }

    },
    mounted() {
        var _this = this;

        axios.get(onewords_url)
            .then(res => {
                _this.onewords = res.data.hitokoto;
                _this.one_word_user = res.data.from;
            })
            .catch(err => {
                console.error(err);
            })

        axios.get(syxzImg_url)
            .then(res => {
                PiG_img.url = res.data.img;
                _this.app = {
                    backgroundImage: 'url(https:' + PiG_img.url + ')'
                }
            })
            .catch(err => {
                console.error(err);
            })

    },
    methods: {
        repace() {
            axios.get(onewords_url)
                .then(res => {
                    this.onewords = res.data.hitokoto;
                    this.one_word_user = res.data.from;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        goto(event) {
            if (event == "blog") {
                window.open(""); //跳转链接
            } else if (event == "demo") {
                window.open(""); //跳转链接
            } else if (event == "about") {
                window.open(""); //跳转链接
            }
        }
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
})