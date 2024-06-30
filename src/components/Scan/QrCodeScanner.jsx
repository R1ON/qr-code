import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
// import { Scanner } from '@yudiel/react-qr-scanner';
import { QrReader } from 'react-qr-reader';
import s from './qrCodeScanner.module.css';

import { SCAN_DATA } from '../../constants';

export const QrCodeScanner = () => {
    const [scanned, setScanned] = useState(null);
    const [isReady, setIsReady] = useState(false);

    const scanHandler = (result) => {
        console.log('result', result);
        setScanned(result[0].rawValue);

        const prevData = JSON.parse(localStorage.getItem(SCAN_DATA) || '[]');

        localStorage.setItem(
            SCAN_DATA,
            JSON.stringify([...prevData, result[0].rawValue])
        );
    };


    useEffect(() => {
        // if (!isReady) return;

        const onScanSuccess = (decodedText, decodedResult) => {
            console.log('decodedText', decodedText)
            console.log('decodedResult', decodedResult)
          };
      
          const onScanFailure = (errorMessage, error) => {
            
          };
        const config = {
            fps: 10,
            qrbox: {
              width: 350,
              height: 250,
            },
          };

          const reader = new Html5Qrcode('video');

          if (isReady) {
            reader.start({ facingMode: 'environment' }, config, (result) => {
                console.log('result', result)
              })
          }
         
    }, [isReady]);

    return (
        <div className={s.container}>

            {/* <div id="video" className='test' /> */}

            <QrReader
                onResult={(result, error) => {
                console.log('result', result)
                }}
                containerStyle={{ width: '300px' }}
            />
            
            {/* <Scanner
                allowMultiple
                onScan={scanHandler}
                components={{
                    audio: false,
                    finder: false,
                }}
                styles={{
                    container: { width: 300 }
                }}
            /> */}
            <p className={s.result}>{scanned}</p>

            {/* <button onClick={() => setIsReady(!isReady)}>test</button> */}
        </div>
    );
};
