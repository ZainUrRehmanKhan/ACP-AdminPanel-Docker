export default function({ $auth, route, redirect }) {
  if ($auth.hasScope('supplier')) {
    if ([''].includes(route.path)) {
    }
  }
}
