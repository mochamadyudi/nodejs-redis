export default class BodyHandler {
    constructor(props) {
        this.response = {
            ...props,
            error: props?.error ?? false,
            status: props?.status ?? 200,
            message: props?.message ?? null,
            data: props?.data ?? null,
        }
        return {...this.response};
    }
}
