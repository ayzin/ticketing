import axios from "axios";

const BuildClient = ({ req }) => {
    if (typeof window === 'undefined') {
        // on server
        return axios.create({
            baseURL:
                'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        })
    } else {
        // on browswer

        return axios.create({
            baseURL: '/'
        })
    }
}

export default BuildClient;