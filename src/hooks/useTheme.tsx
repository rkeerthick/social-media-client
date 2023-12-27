import React from 'react'
import { useTheme } from '@mui/material'
import { CustomPalette } from 'types/ThemesType'

const UseTheme = () => useTheme<CustomPalette>()

export default UseTheme