import {Dimensions, StatusBar} from 'react-native';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');
export const STATUS_BAR_HEIGHT = StatusBar.currentHeight ?? 40;
