package br.com.zup.screens.react

import br.com.zup.screens.ImageScreen
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import org.openqa.selenium.support.PageFactory

class ReactTabViewScreen(private val driver: WebDriver): TabViewScreen {

    @FindBy(xpath = "/html/body/div/div/div/div[1]/div[1]")
    override val tab1Text: WebElement? = null

    @FindBy(xpath = )
    override val tab1Text2: WebElement? = null

    @FindBy(xpath = )
    override val tab1Text3: WebElement? = null

    @FindBy(xpath = )
    override val tab2Text: WebElement? = null

    @FindBy(xpath = )
    override val tab2Text2: WebElement? = null

    @FindBy(xpath = )
    override val tab2Text3: WebElement? = null

    @FindBy(xpath = )
    override val tab3Text: WebElement? = null

    @FindBy(xpath = )
    override val tab3Text2: WebElement? = null

    @FindBy(xpath = )
    override val tab3Text3: WebElement? = null

    @FindBy(xpath = )
    override val tab4Text: WebElement? = null

    @FindBy(xpath = )
    override val tab4Text2: WebElement? = null

    @FindBy(xpath = )
    override val tab4Text3: WebElement? = null


    init {
        PageFactory.initElements(driver, this)
    }
}