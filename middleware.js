// Protección del lado del servidor: nada se entrega sin la clave.
// El navegador muestra su diálogo nativo de usuario/clave.
//   usuario: diplomado
//   clave:   DiplomadoVentureUC
export const config = {
  matcher: '/(.*)',
};

export default function middleware(request) {
  const EXPECTED = 'Basic ' + btoa('diplomado:DiplomadoVentureUC');
  const provided = request.headers.get('authorization') || '';

  if (provided === EXPECTED) {
    return; // autorizado: continúa y sirve el contenido
  }

  return new Response('Autenticación requerida.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Diplomado Venture Capital UC", charset="UTF-8"',
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}
