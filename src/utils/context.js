const WEBGL_PARAMS = {
  // Boolean that indicates if the canvas contains an alpha buffer
  alpha: true,
  // Boolean that indicates that the drawing buffer has a depth buffer of at least 16 bits.
  depth: false,
  // Boolean that indicates that the drawing buffer has a stencil buffer of at least 8 bits.
  stencil: false,
  // Boolean that indicates whether or not to perform anti-aliasing.
  antialias: false,
  // If the value is true the buffers will not be cleared and will preserve their values until
  // cleared or overwritten by the author.
  preserveDrawingBuffer: false
};

export const getWebGLContext = (canvas) => {
  let context;
  try {
    context = canvas.getContext('webgl2', WEBGL_PARAMS);
  } catch (e) {
    throw ('WebGL 2 is not supported', e);
  }

  context.getExtension('EXT_color_buffer_float');
  const supportLinearFiltering = context.getExtension('OES_texture_half_float_linear');

  // Set color to black
  context.clearColor(0.0, 0.0, 0.0, 1.0);
};
