export const getWebGLContext = (canvas) => {
  let context;
  try {
    context = canvas.getContext('webgl');
  } catch (e) {
    throw ('WebGL not supported', e);
  }

  // Set color to black
  context.clearColor(0.0, 0.0, 0.0, 1.0);
};
