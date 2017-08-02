import AppHeader from '../components/appHeader.vue'
import Footer from '../components/appFooter.vue'
import goingOn from '../components/loading.vue'
import Call from '../components/call.vue'
import config from 'config'
import C from '../store/constants'
const stream = weex.requireModule('stream')
const storage = weex.requireModule('storage')
// const BASE_URI = 'http://gl.zmnbx.com/'
const BASE_URI = config.server
const animation = weex.requireModule('animation')
function serialize(obj, prefix) {
    var str = [],
        p;
    for (p in obj) {
        if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + "[" + p + "]" : p,
                v = obj[p];
            str.push((v !== null && typeof v === "object") ?
                serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    return str.join("&");
}

function streamCallback(success, error, response) {
    if (response.ok) {
        success && success(response.data)
    } else {
        error && error(response)
    }
}

function ajax({ method, url, data, success, error }) {
    let body = ''
    url = BASE_URI + url
    url = `${url}?${serialize(data)}`
    stream.fetch({
        method: method,
        type: 'json',
        url: url,
        body: body
    }, streamCallback.bind(this, success, error))
}

export default {
    components: {

        AppHeader, Footer, goingOn, Call
    },
    methods: {
        pageTo(to) {
            if (this.$router) {
                this.$router.push(to)
            }
        },
        _get(url, data, success, error) {
            data = data || {}
            data.token = this.$store.state[C.store.TOKEN]
            ajax({ method: 'GET', url, data, success, error })
        },
        _post(url, data, success, error) {
            data = data || {}
            data.token = this.$store.state[C.store.TOKEN]
            ajax({ method: 'POST', url, data, success, error })
        }
    }
}