export const isMobile = () => {
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
};

export const isUsingWebGL2 = (canvas: HTMLCanvasElement) => {
  return Boolean(canvas.getContext('webgl2'));
};

export const supportsLinearFiltering = (canvas: HTMLCanvasElement) => {
  const context = getWebGLContext(canvas);
  return Boolean(context?.ext.supportLinearFiltering);
}

const supportsRenderTextureFormat = (gl: WebGL2RenderingContext, internalFormat: number, format: number, type: number): boolean => {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
  gl.bindFramebuffer(gl.FRAMEBUFFER, gl.createFramebuffer());
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

  return gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
}

function getSupportedFormat(gl: WebGL2RenderingContext, internalFormat: number, format: number, type: number) {

  if (!supportsRenderTextureFormat(gl, internalFormat, format, type)) {
    switch (internalFormat) {
      case gl.R16F:
        return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
      case gl.RG16F:
        return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
      default:
        return null;
    }
  }

  return {
    internalFormat,
    format
  }
}

export const getWebGLContext = (canvas: HTMLCanvasElement) => {
  const gl = canvas.getContext('webgl2', {
    stencil: false,
    antialias: false,
    depth: false,
    alpha: true
  });

  if(!gl) return;
  
  gl.getExtension('EXT_color_buffer_float');
  const supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  const halfFloatTexType = gl.HALF_FLOAT;
  const formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
  const formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
  const formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);

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