import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ChakraProvider, ColorModeScript, extendTheme} from '@chakra-ui/react'
import {NextUIProvider} from '@nextui-org/react'
const config = {
	initialColorMode: 'light',
	useSystemColorMode: false,
}
const theme = extendTheme({config})

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ChakraProvider theme={theme}>
			<NextUIProvider>
				<ColorModeScript initialColorMode={theme.config.initialColorMode} />
				<App />
			</NextUIProvider>
		</ChakraProvider>
	</StrictMode>,
)
