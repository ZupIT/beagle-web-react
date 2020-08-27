package br.com.zup.elements

import org.openqa.selenium.WebElement

interface ButtonScreen {

    val buttonDefault: WebElement?
    val buttonWithStyle: WebElement?
    val buttonWithAppearance: WebElement?
    val buttonWithAppearanceAndStyle: WebElement?
    val actionClickText: WebElement?

}