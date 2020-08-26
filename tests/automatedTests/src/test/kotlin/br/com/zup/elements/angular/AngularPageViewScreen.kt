package br.com.zup.screens.angular

import br.com.zup.screens.ImageScreen
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import org.openqa.selenium.support.PageFactory

class AngularPageViewScreen(private val driver: WebDriver): PageViewScreen {

    @FindBy(id = "search-icon-legacy")
    override val pageviewText: WebElement? = null

    init {
        PageFactory.initElements(driver, this)
    }
}