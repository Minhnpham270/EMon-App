import React, { useEffect, useState } from 'react';
import { Box, Modal, useToast } from 'native-base';
import { CameraView } from 'expo-camera/next';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

type Props = {
  open: boolean;
  closeModal: () => void;
};

export const ModalScannerItem: React.FC<Props> = ({ open, closeModal }) => {
  const [scanned, setScanned] = React.useState(false);
  const toast = useToast();
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getCameraPermissions();
  }, []);

  useEffect(() => {
    if (open) {
      setScanned(false);
    }
  }, [open]);

  const handleBarCodeScanned = ({ type, data }: any) => {
    closeModal();
    setScanned(true);
    navigation.navigate('Search', {
      text: data,
    });
  };

  return (
    <Modal isOpen={open} size={'full'} onClose={closeModal} safeAreaTop={true}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Quét Mã</Modal.Header>
        <Modal.Body>
          <Box
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <CameraView
              style={{
                width: '100%',
                aspectRatio: 1,
                overflow: 'hidden',
                borderRadius: 10,
                marginBottom: 10,
              }}
              onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: [
                  'pdf417',
                  'codabar',
                  'datamatrix',
                  'qr',
                  'aztec',
                  'ean13',
                  'ean8',
                  'upc_e',
                  'code39',
                  'code93',
                  'itf14',
                  'code128',
                  'upc_a',
                ],
              }}
            />
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
