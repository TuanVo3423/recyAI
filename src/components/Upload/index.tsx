import {
  Box,
  Button,
  Image as ChakraImage,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

type UploaderProps = {
  setFiles: any;
  files: any;
  handleSubmitButton?: React.ReactElement;
};
export const Uploader = ({
  files,
  setFiles,
  handleSubmitButton,
}: UploaderProps) => {
  //   const [files, setFiles] = useState<any[]>([]);

  const setFilesState = (data) => setFiles((p) => [...p, data]);

  const handleSubmit = async () => {
    try {
      const uploadPromises = files.map(async (file) => {
        const { base64, height, width } = file;

        // const url = 'http://localhost:8000/upload';

        // const { data } = await axios.post(url, {
        //   src: base64,
        //   height,
        //   width,
        // });

        // console.log(data);
      });

      await Promise.all(uploadPromises);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((fileObject) => {
      // tao ra preview cho tung thang
      const preview = URL.createObjectURL(fileObject);
      //   setFilesState({
      //     fileObject,
      //     preview,
      //   });

      const image = new Image();

      image.src = preview;

      //   image.onload = () =>
      //     setFilesState({
      //       width: image.width,
      //       height: image.height,
      //     });

      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');

      reader.onerror = () => console.log('file reading has failed');

      reader.readAsDataURL(fileObject);

      reader.onload = () =>
        setFilesState({
          width: image.width,
          height: image.height,
          fileObject,
          preview,
          base64: reader.result,
        });
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // maxFiles: , // Allow up to 5 files
    accept: {
      'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
    },
  });

  useEffect(() => {
    // Cleanup for each file's preview
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <Stack flex={1}>
      {files.length > 0 ? (
        <Box display="flex" flexWrap="wrap">
          {files.map((file, index) => {
            return (
              <ChakraImage
                key={index}
                src={file.preview}
                alt=""
                w="calc(60% - 1rem)"
                // minH="8rem"
                m="0.5rem"
              />
            );
          })}
        </Box>
      ) : (
        <Box
          display="grid"
          placeItems="center"
          border="1px dashed black"
          flex={1}
          minH="8rem"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Text>
            {isDragActive
              ? 'Release to drop the files here'
              : 'Drag or drop some files here, or click to select files'}
          </Text>
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Button
          variant="outline"
          mt={2}
          mr={4}
          ml="auto"
          color="green.400"
          // backgroundColor={'green.400'}
          onClick={() => setFiles([])}
        >
          Reset
        </Button>
        {handleSubmitButton}
      </Box>
    </Stack>
  );
};
