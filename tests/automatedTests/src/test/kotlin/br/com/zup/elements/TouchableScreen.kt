package br.com.zup.screens

import org.openqa.selenium.WebElement

interface TouchableScreen {

    val textWithTouchableText: WebElement?
    val imageWithTouchableText: WebElement?
    val clickHereTouchableText: WebElement?
    val networkImageWithTouchableText: WebElement?
    val actionClickText: WebElement?

}