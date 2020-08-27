package br.com.zup.elements.angular

import br.com.zup.elements.PageViewScreen
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import org.openqa.selenium.support.PageFactory

class AngularPageViewScreen(private val driver: WebDriver): PageViewScreen {

    override val page1Text: WebElement?
        get() = TODO("Not yet implemented")
    override val page2Text: WebElement?
        get() = TODO("Not yet implemented")
    override val page3Text: WebElement?
        get() = TODO("Not yet implemented")
    override val pageIndicator: WebElement?
        get() = TODO("Not yet implemented")

    init {
        PageFactory.initElements(driver, this)
    }
}