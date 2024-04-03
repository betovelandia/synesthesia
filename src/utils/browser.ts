export const isMobile = () => {
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
};

export const isUsingWebGL2 = (canvas: HTMLCanvasElement) => {
  return Boolean(canvas.getContext('wbgl2'));
};

export const getWebGLContext = (canvas: HTMLCanvasElement) => {
  let halfFloat;
  let supportLinearFiltering;

  const gl = canvas.getContext('webgl2', {
    antialias: false,
    stencil: false,
    depth: false,
    alpha: true
  });

  if(!gl) return;
  
  if (isUsingWebGL2(canvas) ) {
    gl.getExtension('EXT_color_buffer_float');
    supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
  } else {
    halfFloat = gl.getExtension('OES_texture_float');
    supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  const halfFloatTexType = isUsingWebGL2(canvas) ? gl.HALF_FLOAT : halfFloat.HALF_FLOAT_OES;
  let formatRGBA;
  let formatRG;
  let formatR;

  if (isUsingWebGL2(canvas)) {
    formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
    formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
    formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
  }
  else {
    formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
  }

  ga('send', 'event', isWebGL2 ? 'webgl2' : 'webgl', formatRGBA == null ? 'not supported' : 'supported');

  return {
    gl,
    ext: {
      formatRGBA,
      formatRG,
      formatR,
      halfFloatTexType,
      supportLinearFiltering
    }
  };
}

declare global {
  interface CanvasRenderingContext2D {
    getExtension: () => {};
  }
}