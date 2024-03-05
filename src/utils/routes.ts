type RoutesProps = {
    HOME: string,
    CATEGORY: string,
    PRODUCT: string
}

export const ROUTES: RoutesProps = {
    HOME: '/',
    CATEGORY: '/categories/:id',
    PRODUCT: '/products/:id'
}