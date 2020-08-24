package br.com.zup.screens

import org.openqa.selenium.WebElement

interface ListViewScreen {

    val listViewStaticVerticalText: WebElement?
    val listViewDynamicVerticalText: WebElement?
    val listViewStaticHorizontalText: WebElement?
    val listViewDynamicHorizontalText: WebElement?

}