package br.com.zup.elements.react

import br.com.zup.elements.ListViewScreen
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import org.openqa.selenium.support.PageFactory

class ReactListViewScreen(private val driver: WebDriver): ListViewScreen {

    @FindBy(xpath = "/html/body/div/div/div/div[1]/p")
    override val listViewStaticVerticalText: WebElement? = null

    @FindBy(xpath = "/html/body/div/div/div/div[3]/p")
    override val listViewDynamicVerticalText: WebElement? = null

    @FindBy(xpath = "/html/body/div/div/div/div[2]/p")
    override val listViewStaticHorizontalText: WebElement? = null

    @FindBy(xpath = "/html/body/div/div/div/div[4]/p")
    override val listViewDynamicHorizontalText: WebElement? = null

    init {
        PageFactory.initElements(driver, this)
    }
}