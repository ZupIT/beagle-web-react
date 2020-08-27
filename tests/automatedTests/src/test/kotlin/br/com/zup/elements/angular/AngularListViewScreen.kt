package br.com.zup.elements.angular

import br.com.zup.elements.ListViewScreen
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import org.openqa.selenium.support.PageFactory

class AngularListViewScreen(private val driver: WebDriver): ListViewScreen {

    override val listViewStaticVerticalText: WebElement?
        get() = TODO("Not yet implemented")
    override val listViewDynamicVerticalText: WebElement?
        get() = TODO("Not yet implemented")
    override val listViewStaticHorizontalText: WebElement?
        get() = TODO("Not yet implemented")
    override val listViewDynamicHorizontalText: WebElement?
        get() = TODO("Not yet implemented")

    init {
        PageFactory.initElements(driver, this)
    }

}