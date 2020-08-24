package br.com.zup.screens.react

import br.com.zup.screens.ImageScreen
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import org.openqa.selenium.support.PageFactory

class ReactPageViewScreen(private val driver: WebDriver): PageViewScreen {

    @FindBy(xpath = "/html/body/div/div/div/div/p[1]")
    override val page1Text: WebElement? = null

    @FindBy(xpath = "/html/body/div/div/div/div/p[2]")
    override val page2Text: WebElement? = null

    @FindBy(xpath = "/html/body/div/div/div/div/p[3]")
    override val page3Text: WebElement? = null

    @FindBy(xpath = )
    override val pageIndicator: WebElement? = null

    init {
        PageFactory.initElements(driver, this)
    }
}