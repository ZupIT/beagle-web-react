package br.com.zup.screens.react

import br.com.zup.screens.ImageScreen
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import org.openqa.selenium.support.PageFactory

class ReactImageScreen(private val driver: WebDriver): ImageScreen {

    @FindBy(xpath = "/html/body/div/div/div/p[1]")
    override val imageText1: WebElement? = null

    init {
        PageFactory.initElements(driver, this)
    }
}