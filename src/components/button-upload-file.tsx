import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

interface ButtonUploadFileProps {
  urlDefault?: string;
  variant?: any;
  color?: any;
  typeFile?: string;
  onChangeFile: (fileUrl) => void;
  label?: string;
}

const ButtonUploadFile: FC<ButtonUploadFileProps> = ({
  urlDefault,
  variant,
  color,
  typeFile,
  label,
  onChangeFile,
}: ButtonUploadFileProps) => {
  const [urlFile, setUrlFile] = useState('');
  let openFiles;

  useEffect(() => {
    if (urlDefault) {
      setUrlFile(urlDefault);
    }
  }, [urlDefault]);

  const onChange = (_urlFile) => {
    setUrlFile(_urlFile);
    onChangeFile(_urlFile);
  };
  return (
    <>
      <input
        id="myInput"
        type="file"
        accept={typeFile}
        ref={(ref) => (openFiles = ref)}
        style={{ display: 'none' }}
        onChange={(event) => onChange(event.target.files[0] ? event.target.files[0] : urlFile)}
      />
      <Button
        variant={variant}
        color={color}
        onClick={() => openFiles.click()}
      >
        {label}
      </Button>
    </>
  );
};

ButtonUploadFile.prototype = {
  urlDefault: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  typeFile: PropTypes.string.isRequired,
  onChangeFile: PropTypes.func,
  label: PropTypes.string,
};
ButtonUploadFile.defaultProps = {
  variant: 'text',
  color: 'primary',
  typeFile: 'image/*',
  label: 'Load File',
};

export default ButtonUploadFile;
