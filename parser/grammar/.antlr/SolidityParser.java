// Generated from /home/spalladino/Projects/solidity-docgen/parser/grammar/Solidity.g4 by ANTLR 4.7
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class SolidityParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.7", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, T__8=9, 
		T__9=10, T__10=11, T__11=12, T__12=13, T__13=14, T__14=15, T__15=16, T__16=17, 
		T__17=18, T__18=19, T__19=20, T__20=21, T__21=22, T__22=23, T__23=24, 
		T__24=25, T__25=26, T__26=27, T__27=28, T__28=29, T__29=30, T__30=31, 
		T__31=32, T__32=33, T__33=34, T__34=35, T__35=36, T__36=37, T__37=38, 
		T__38=39, T__39=40, T__40=41, T__41=42, T__42=43, T__43=44, T__44=45, 
		T__45=46, T__46=47, T__47=48, T__48=49, T__49=50, T__50=51, T__51=52, 
		T__52=53, T__53=54, T__54=55, T__55=56, T__56=57, T__57=58, T__58=59, 
		T__59=60, T__60=61, T__61=62, T__62=63, T__63=64, T__64=65, T__65=66, 
		T__66=67, T__67=68, T__68=69, T__69=70, T__70=71, T__71=72, T__72=73, 
		T__73=74, T__74=75, T__75=76, T__76=77, T__77=78, T__78=79, T__79=80, 
		T__80=81, T__81=82, T__82=83, T__83=84, T__84=85, T__85=86, T__86=87, 
		Int=88, Uint=89, Byte=90, Fixed=91, Ufixed=92, VersionLiteral=93, BooleanLiteral=94, 
		DecimalNumber=95, HexNumber=96, NumberUnit=97, HexLiteral=98, ReservedKeyword=99, 
		AnonymousKeyword=100, BreakKeyword=101, ConstantKeyword=102, ContinueKeyword=103, 
		ExternalKeyword=104, IndexedKeyword=105, InternalKeyword=106, PayableKeyword=107, 
		PrivateKeyword=108, PublicKeyword=109, PureKeyword=110, ViewKeyword=111, 
		Identifier=112, StringLiteral=113, WS=114, NATSPEC_COMMENT=115, COMMENT=116, 
		NATSPEC_LINE_COMMENT=117, LINE_COMMENT=118;
	public static final int
		RULE_sourceUnit = 0, RULE_pragmaDirective = 1, RULE_pragmaName = 2, RULE_pragmaValue = 3, 
		RULE_version = 4, RULE_versionOperator = 5, RULE_versionConstraint = 6, 
		RULE_importDeclaration = 7, RULE_importDirective = 8, RULE_contractDefinition = 9, 
		RULE_inheritanceSpecifier = 10, RULE_contractPart = 11, RULE_stateVariableDeclaration = 12, 
		RULE_usingForDeclaration = 13, RULE_structDefinition = 14, RULE_modifierDefinition = 15, 
		RULE_modifierInvocation = 16, RULE_functionDefinition = 17, RULE_returnParameters = 18, 
		RULE_modifierList = 19, RULE_eventDefinition = 20, RULE_enumValue = 21, 
		RULE_enumDefinition = 22, RULE_parameterList = 23, RULE_parameter = 24, 
		RULE_eventParameterList = 25, RULE_eventParameter = 26, RULE_functionTypeParameterList = 27, 
		RULE_functionTypeParameter = 28, RULE_variableDeclaration = 29, RULE_typeName = 30, 
		RULE_userDefinedTypeName = 31, RULE_mapping = 32, RULE_functionTypeName = 33, 
		RULE_storageLocation = 34, RULE_stateMutability = 35, RULE_block = 36, 
		RULE_statement = 37, RULE_expressionStatement = 38, RULE_ifStatement = 39, 
		RULE_whileStatement = 40, RULE_simpleStatement = 41, RULE_forStatement = 42, 
		RULE_inlineAssemblyStatement = 43, RULE_doWhileStatement = 44, RULE_continueStatement = 45, 
		RULE_breakStatement = 46, RULE_returnStatement = 47, RULE_throwStatement = 48, 
		RULE_variableDeclarationStatement = 49, RULE_identifierList = 50, RULE_elementaryTypeName = 51, 
		RULE_expression = 52, RULE_primaryExpression = 53, RULE_expressionList = 54, 
		RULE_nameValueList = 55, RULE_nameValue = 56, RULE_functionCallArguments = 57, 
		RULE_assemblyBlock = 58, RULE_assemblyItem = 59, RULE_assemblyExpression = 60, 
		RULE_assemblyCall = 61, RULE_assemblyLocalDefinition = 62, RULE_assemblyAssignment = 63, 
		RULE_assemblyIdentifierOrList = 64, RULE_assemblyIdentifierList = 65, 
		RULE_assemblyStackAssignment = 66, RULE_labelDefinition = 67, RULE_assemblySwitch = 68, 
		RULE_assemblyCase = 69, RULE_assemblyFunctionDefinition = 70, RULE_assemblyFunctionReturns = 71, 
		RULE_assemblyFor = 72, RULE_assemblyIf = 73, RULE_assemblyLiteral = 74, 
		RULE_subAssembly = 75, RULE_tupleExpression = 76, RULE_elementaryTypeNameExpression = 77, 
		RULE_natspec = 78, RULE_numberLiteral = 79, RULE_identifier = 80;
	public static final String[] ruleNames = {
		"sourceUnit", "pragmaDirective", "pragmaName", "pragmaValue", "version", 
		"versionOperator", "versionConstraint", "importDeclaration", "importDirective", 
		"contractDefinition", "inheritanceSpecifier", "contractPart", "stateVariableDeclaration", 
		"usingForDeclaration", "structDefinition", "modifierDefinition", "modifierInvocation", 
		"functionDefinition", "returnParameters", "modifierList", "eventDefinition", 
		"enumValue", "enumDefinition", "parameterList", "parameter", "eventParameterList", 
		"eventParameter", "functionTypeParameterList", "functionTypeParameter", 
		"variableDeclaration", "typeName", "userDefinedTypeName", "mapping", "functionTypeName", 
		"storageLocation", "stateMutability", "block", "statement", "expressionStatement", 
		"ifStatement", "whileStatement", "simpleStatement", "forStatement", "inlineAssemblyStatement", 
		"doWhileStatement", "continueStatement", "breakStatement", "returnStatement", 
		"throwStatement", "variableDeclarationStatement", "identifierList", "elementaryTypeName", 
		"expression", "primaryExpression", "expressionList", "nameValueList", 
		"nameValue", "functionCallArguments", "assemblyBlock", "assemblyItem", 
		"assemblyExpression", "assemblyCall", "assemblyLocalDefinition", "assemblyAssignment", 
		"assemblyIdentifierOrList", "assemblyIdentifierList", "assemblyStackAssignment", 
		"labelDefinition", "assemblySwitch", "assemblyCase", "assemblyFunctionDefinition", 
		"assemblyFunctionReturns", "assemblyFor", "assemblyIf", "assemblyLiteral", 
		"subAssembly", "tupleExpression", "elementaryTypeNameExpression", "natspec", 
		"numberLiteral", "identifier"
	};

	private static final String[] _LITERAL_NAMES = {
		null, "'pragma'", "';'", "'^'", "'>='", "'>'", "'<'", "'<='", "'as'", 
		"'import'", "'*'", "'from'", "'{'", "','", "'}'", "'contract'", "'interface'", 
		"'library'", "'is'", "'('", "')'", "'='", "'using'", "'for'", "'struct'", 
		"'modifier'", "'function'", "'returns'", "'event'", "'enum'", "'['", "']'", 
		"'.'", "'mapping'", "'=>'", "'memory'", "'storage'", "'if'", "'else'", 
		"'while'", "'assembly'", "'do'", "'return'", "'throw'", "'var'", "'address'", 
		"'bool'", "'string'", "'byte'", "'++'", "'--'", "'new'", "'+'", "'-'", 
		"'after'", "'delete'", "'!'", "'~'", "'**'", "'/'", "'%'", "'<<'", "'>>'", 
		"'&'", "'|'", "'=='", "'!='", "'&&'", "'||'", "'?'", "':'", "'|='", "'^='", 
		"'&='", "'<<='", "'>>='", "'+='", "'-='", "'*='", "'/='", "'%='", "'let'", 
		"':='", "'=:'", "'switch'", "'case'", "'default'", "'->'", null, null, 
		null, null, null, null, null, null, null, null, null, null, "'anonymous'", 
		"'break'", "'constant'", "'continue'", "'external'", "'indexed'", "'internal'", 
		"'payable'", "'private'", "'public'", "'pure'", "'view'"
	};
	private static final String[] _SYMBOLIC_NAMES = {
		null, null, null, null, null, null, null, null, null, null, null, null, 
		null, null, null, null, null, null, null, null, null, null, null, null, 
		null, null, null, null, null, null, null, null, null, null, null, null, 
		null, null, null, null, null, null, null, null, null, null, null, null, 
		null, null, null, null, null, null, null, null, null, null, null, null, 
		null, null, null, null, null, null, null, null, null, null, null, null, 
		null, null, null, null, null, null, null, null, null, null, null, null, 
		null, null, null, null, "Int", "Uint", "Byte", "Fixed", "Ufixed", "VersionLiteral", 
		"BooleanLiteral", "DecimalNumber", "HexNumber", "NumberUnit", "HexLiteral", 
		"ReservedKeyword", "AnonymousKeyword", "BreakKeyword", "ConstantKeyword", 
		"ContinueKeyword", "ExternalKeyword", "IndexedKeyword", "InternalKeyword", 
		"PayableKeyword", "PrivateKeyword", "PublicKeyword", "PureKeyword", "ViewKeyword", 
		"Identifier", "StringLiteral", "WS", "NATSPEC_COMMENT", "COMMENT", "NATSPEC_LINE_COMMENT", 
		"LINE_COMMENT"
	};
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "Solidity.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public SolidityParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}
	public static class SourceUnitContext extends ParserRuleContext {
		public TerminalNode EOF() { return getToken(SolidityParser.EOF, 0); }
		public List<PragmaDirectiveContext> pragmaDirective() {
			return getRuleContexts(PragmaDirectiveContext.class);
		}
		public PragmaDirectiveContext pragmaDirective(int i) {
			return getRuleContext(PragmaDirectiveContext.class,i);
		}
		public List<ImportDirectiveContext> importDirective() {
			return getRuleContexts(ImportDirectiveContext.class);
		}
		public ImportDirectiveContext importDirective(int i) {
			return getRuleContext(ImportDirectiveContext.class,i);
		}
		public List<ContractDefinitionContext> contractDefinition() {
			return getRuleContexts(ContractDefinitionContext.class);
		}
		public ContractDefinitionContext contractDefinition(int i) {
			return getRuleContext(ContractDefinitionContext.class,i);
		}
		public SourceUnitContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_sourceUnit; }
	}

	public final SourceUnitContext sourceUnit() throws RecognitionException {
		SourceUnitContext _localctx = new SourceUnitContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_sourceUnit);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(167);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__8) | (1L << T__14) | (1L << T__15) | (1L << T__16))) != 0) || _la==NATSPEC_COMMENT || _la==NATSPEC_LINE_COMMENT) {
				{
				setState(165);
				_errHandler.sync(this);
				switch (_input.LA(1)) {
				case T__0:
					{
					setState(162);
					pragmaDirective();
					}
					break;
				case T__8:
					{
					setState(163);
					importDirective();
					}
					break;
				case T__14:
				case T__15:
				case T__16:
				case NATSPEC_COMMENT:
				case NATSPEC_LINE_COMMENT:
					{
					setState(164);
					contractDefinition();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				setState(169);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(170);
			match(EOF);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PragmaDirectiveContext extends ParserRuleContext {
		public PragmaNameContext pragmaName() {
			return getRuleContext(PragmaNameContext.class,0);
		}
		public PragmaValueContext pragmaValue() {
			return getRuleContext(PragmaValueContext.class,0);
		}
		public PragmaDirectiveContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_pragmaDirective; }
	}

	public final PragmaDirectiveContext pragmaDirective() throws RecognitionException {
		PragmaDirectiveContext _localctx = new PragmaDirectiveContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_pragmaDirective);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(172);
			match(T__0);
			setState(173);
			pragmaName();
			setState(174);
			pragmaValue();
			setState(175);
			match(T__1);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PragmaNameContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public PragmaNameContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_pragmaName; }
	}

	public final PragmaNameContext pragmaName() throws RecognitionException {
		PragmaNameContext _localctx = new PragmaNameContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_pragmaName);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(177);
			identifier();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PragmaValueContext extends ParserRuleContext {
		public VersionContext version() {
			return getRuleContext(VersionContext.class,0);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public PragmaValueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_pragmaValue; }
	}

	public final PragmaValueContext pragmaValue() throws RecognitionException {
		PragmaValueContext _localctx = new PragmaValueContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_pragmaValue);
		try {
			setState(181);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__2:
			case T__3:
			case T__4:
			case T__5:
			case T__6:
			case VersionLiteral:
				enterOuterAlt(_localctx, 1);
				{
				setState(179);
				version();
				}
				break;
			case T__10:
			case T__18:
			case T__29:
			case T__43:
			case T__44:
			case T__45:
			case T__46:
			case T__47:
			case T__48:
			case T__49:
			case T__50:
			case T__51:
			case T__52:
			case T__53:
			case T__54:
			case T__55:
			case T__56:
			case Int:
			case Uint:
			case Byte:
			case Fixed:
			case Ufixed:
			case BooleanLiteral:
			case DecimalNumber:
			case HexNumber:
			case HexLiteral:
			case Identifier:
			case StringLiteral:
				enterOuterAlt(_localctx, 2);
				{
				setState(180);
				expression(0);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class VersionContext extends ParserRuleContext {
		public List<VersionConstraintContext> versionConstraint() {
			return getRuleContexts(VersionConstraintContext.class);
		}
		public VersionConstraintContext versionConstraint(int i) {
			return getRuleContext(VersionConstraintContext.class,i);
		}
		public VersionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_version; }
	}

	public final VersionContext version() throws RecognitionException {
		VersionContext _localctx = new VersionContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_version);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(183);
			versionConstraint();
			setState(185);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__2) | (1L << T__3) | (1L << T__4) | (1L << T__5) | (1L << T__6))) != 0) || _la==VersionLiteral) {
				{
				setState(184);
				versionConstraint();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class VersionOperatorContext extends ParserRuleContext {
		public VersionOperatorContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_versionOperator; }
	}

	public final VersionOperatorContext versionOperator() throws RecognitionException {
		VersionOperatorContext _localctx = new VersionOperatorContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_versionOperator);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(187);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__2) | (1L << T__3) | (1L << T__4) | (1L << T__5) | (1L << T__6))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class VersionConstraintContext extends ParserRuleContext {
		public TerminalNode VersionLiteral() { return getToken(SolidityParser.VersionLiteral, 0); }
		public VersionOperatorContext versionOperator() {
			return getRuleContext(VersionOperatorContext.class,0);
		}
		public VersionConstraintContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_versionConstraint; }
	}

	public final VersionConstraintContext versionConstraint() throws RecognitionException {
		VersionConstraintContext _localctx = new VersionConstraintContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_versionConstraint);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(190);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__2) | (1L << T__3) | (1L << T__4) | (1L << T__5) | (1L << T__6))) != 0)) {
				{
				setState(189);
				versionOperator();
				}
			}

			setState(192);
			match(VersionLiteral);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ImportDeclarationContext extends ParserRuleContext {
		public List<IdentifierContext> identifier() {
			return getRuleContexts(IdentifierContext.class);
		}
		public IdentifierContext identifier(int i) {
			return getRuleContext(IdentifierContext.class,i);
		}
		public ImportDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_importDeclaration; }
	}

	public final ImportDeclarationContext importDeclaration() throws RecognitionException {
		ImportDeclarationContext _localctx = new ImportDeclarationContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_importDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(194);
			identifier();
			setState(197);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__7) {
				{
				setState(195);
				match(T__7);
				setState(196);
				identifier();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ImportDirectiveContext extends ParserRuleContext {
		public TerminalNode StringLiteral() { return getToken(SolidityParser.StringLiteral, 0); }
		public List<IdentifierContext> identifier() {
			return getRuleContexts(IdentifierContext.class);
		}
		public IdentifierContext identifier(int i) {
			return getRuleContext(IdentifierContext.class,i);
		}
		public List<ImportDeclarationContext> importDeclaration() {
			return getRuleContexts(ImportDeclarationContext.class);
		}
		public ImportDeclarationContext importDeclaration(int i) {
			return getRuleContext(ImportDeclarationContext.class,i);
		}
		public ImportDirectiveContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_importDirective; }
	}

	public final ImportDirectiveContext importDirective() throws RecognitionException {
		ImportDirectiveContext _localctx = new ImportDirectiveContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_importDirective);
		int _la;
		try {
			setState(233);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,10,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(199);
				match(T__8);
				setState(200);
				match(StringLiteral);
				setState(203);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==T__7) {
					{
					setState(201);
					match(T__7);
					setState(202);
					identifier();
					}
				}

				setState(205);
				match(T__1);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(206);
				match(T__8);
				setState(209);
				_errHandler.sync(this);
				switch (_input.LA(1)) {
				case T__9:
					{
					setState(207);
					match(T__9);
					}
					break;
				case T__10:
				case Identifier:
					{
					setState(208);
					identifier();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(213);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==T__7) {
					{
					setState(211);
					match(T__7);
					setState(212);
					identifier();
					}
				}

				setState(215);
				match(T__10);
				setState(216);
				match(StringLiteral);
				setState(217);
				match(T__1);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(218);
				match(T__8);
				setState(219);
				match(T__11);
				setState(220);
				importDeclaration();
				setState(225);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==T__12) {
					{
					{
					setState(221);
					match(T__12);
					setState(222);
					importDeclaration();
					}
					}
					setState(227);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(228);
				match(T__13);
				setState(229);
				match(T__10);
				setState(230);
				match(StringLiteral);
				setState(231);
				match(T__1);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ContractDefinitionContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public NatspecContext natspec() {
			return getRuleContext(NatspecContext.class,0);
		}
		public List<InheritanceSpecifierContext> inheritanceSpecifier() {
			return getRuleContexts(InheritanceSpecifierContext.class);
		}
		public InheritanceSpecifierContext inheritanceSpecifier(int i) {
			return getRuleContext(InheritanceSpecifierContext.class,i);
		}
		public List<ContractPartContext> contractPart() {
			return getRuleContexts(ContractPartContext.class);
		}
		public ContractPartContext contractPart(int i) {
			return getRuleContext(ContractPartContext.class,i);
		}
		public ContractDefinitionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_contractDefinition; }
	}

	public final ContractDefinitionContext contractDefinition() throws RecognitionException {
		ContractDefinitionContext _localctx = new ContractDefinitionContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_contractDefinition);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(236);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==NATSPEC_COMMENT || _la==NATSPEC_LINE_COMMENT) {
				{
				setState(235);
				natspec();
				}
			}

			setState(238);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__14) | (1L << T__15) | (1L << T__16))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			setState(239);
			identifier();
			setState(249);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__17) {
				{
				setState(240);
				match(T__17);
				setState(241);
				inheritanceSpecifier();
				setState(246);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==T__12) {
					{
					{
					setState(242);
					match(T__12);
					setState(243);
					inheritanceSpecifier();
					}
					}
					setState(248);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
			}

			setState(251);
			match(T__11);
			setState(255);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__10) | (1L << T__21) | (1L << T__23) | (1L << T__24) | (1L << T__25) | (1L << T__27) | (1L << T__28) | (1L << T__32) | (1L << T__43) | (1L << T__44) | (1L << T__45) | (1L << T__46) | (1L << T__47))) != 0) || ((((_la - 88)) & ~0x3f) == 0 && ((1L << (_la - 88)) & ((1L << (Int - 88)) | (1L << (Uint - 88)) | (1L << (Byte - 88)) | (1L << (Fixed - 88)) | (1L << (Ufixed - 88)) | (1L << (Identifier - 88)) | (1L << (NATSPEC_COMMENT - 88)) | (1L << (NATSPEC_LINE_COMMENT - 88)))) != 0)) {
				{
				{
				setState(252);
				contractPart();
				}
				}
				setState(257);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(258);
			match(T__13);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class InheritanceSpecifierContext extends ParserRuleContext {
		public UserDefinedTypeNameContext userDefinedTypeName() {
			return getRuleContext(UserDefinedTypeNameContext.class,0);
		}
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public InheritanceSpecifierContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_inheritanceSpecifier; }
	}

	public final InheritanceSpecifierContext inheritanceSpecifier() throws RecognitionException {
		InheritanceSpecifierContext _localctx = new InheritanceSpecifierContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_inheritanceSpecifier);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(260);
			userDefinedTypeName();
			setState(272);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__18) {
				{
				setState(261);
				match(T__18);
				setState(262);
				expression(0);
				setState(267);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==T__12) {
					{
					{
					setState(263);
					match(T__12);
					setState(264);
					expression(0);
					}
					}
					setState(269);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(270);
				match(T__19);
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ContractPartContext extends ParserRuleContext {
		public StateVariableDeclarationContext stateVariableDeclaration() {
			return getRuleContext(StateVariableDeclarationContext.class,0);
		}
		public UsingForDeclarationContext usingForDeclaration() {
			return getRuleContext(UsingForDeclarationContext.class,0);
		}
		public StructDefinitionContext structDefinition() {
			return getRuleContext(StructDefinitionContext.class,0);
		}
		public ModifierDefinitionContext modifierDefinition() {
			return getRuleContext(ModifierDefinitionContext.class,0);
		}
		public FunctionDefinitionContext functionDefinition() {
			return getRuleContext(FunctionDefinitionContext.class,0);
		}
		public EventDefinitionContext eventDefinition() {
			return getRuleContext(EventDefinitionContext.class,0);
		}
		public EnumDefinitionContext enumDefinition() {
			return getRuleContext(EnumDefinitionContext.class,0);
		}
		public ContractPartContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_contractPart; }
	}

	public final ContractPartContext contractPart() throws RecognitionException {
		ContractPartContext _localctx = new ContractPartContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_contractPart);
		try {
			setState(281);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,17,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(274);
				stateVariableDeclaration();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(275);
				usingForDeclaration();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(276);
				structDefinition();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(277);
				modifierDefinition();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(278);
				functionDefinition();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(279);
				eventDefinition();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(280);
				enumDefinition();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class StateVariableDeclarationContext extends ParserRuleContext {
		public TypeNameContext typeName() {
			return getRuleContext(TypeNameContext.class,0);
		}
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public NatspecContext natspec() {
			return getRuleContext(NatspecContext.class,0);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public List<TerminalNode> PublicKeyword() { return getTokens(SolidityParser.PublicKeyword); }
		public TerminalNode PublicKeyword(int i) {
			return getToken(SolidityParser.PublicKeyword, i);
		}
		public List<TerminalNode> InternalKeyword() { return getTokens(SolidityParser.InternalKeyword); }
		public TerminalNode InternalKeyword(int i) {
			return getToken(SolidityParser.InternalKeyword, i);
		}
		public List<TerminalNode> PrivateKeyword() { return getTokens(SolidityParser.PrivateKeyword); }
		public TerminalNode PrivateKeyword(int i) {
			return getToken(SolidityParser.PrivateKeyword, i);
		}
		public List<TerminalNode> ConstantKeyword() { return getTokens(SolidityParser.ConstantKeyword); }
		public TerminalNode ConstantKeyword(int i) {
			return getToken(SolidityParser.ConstantKeyword, i);
		}
		public StateVariableDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_stateVariableDeclaration; }
	}

	public final StateVariableDeclarationContext stateVariableDeclaration() throws RecognitionException {
		StateVariableDeclarationContext _localctx = new StateVariableDeclarationContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_stateVariableDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(284);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==NATSPEC_COMMENT || _la==NATSPEC_LINE_COMMENT) {
				{
				setState(283);
				natspec();
				}
			}

			setState(286);
			typeName(0);
			setState(290);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (((((_la - 102)) & ~0x3f) == 0 && ((1L << (_la - 102)) & ((1L << (ConstantKeyword - 102)) | (1L << (InternalKeyword - 102)) | (1L << (PrivateKeyword - 102)) | (1L << (PublicKeyword - 102)))) != 0)) {
				{
				{
				setState(287);
				_la = _input.LA(1);
				if ( !(((((_la - 102)) & ~0x3f) == 0 && ((1L << (_la - 102)) & ((1L << (ConstantKeyword - 102)) | (1L << (InternalKeyword - 102)) | (1L << (PrivateKeyword - 102)) | (1L << (PublicKeyword - 102)))) != 0)) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				}
				}
				setState(292);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(293);
			identifier();
			setState(296);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__20) {
				{
				setState(294);
				match(T__20);
				setState(295);
				expression(0);
				}
			}

			setState(298);
			match(T__1);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class UsingForDeclarationContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public TypeNameContext typeName() {
			return getRuleContext(TypeNameContext.class,0);
		}
		public UsingForDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_usingForDeclaration; }
	}

	public final UsingForDeclarationContext usingForDeclaration() throws RecognitionException {
		UsingForDeclarationContext _localctx = new UsingForDeclarationContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_usingForDeclaration);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(300);
			match(T__21);
			setState(301);
			identifier();
			setState(302);
			match(T__22);
			setState(305);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__9:
				{
				setState(303);
				match(T__9);
				}
				break;
			case T__10:
			case T__25:
			case T__32:
			case T__43:
			case T__44:
			case T__45:
			case T__46:
			case T__47:
			case Int:
			case Uint:
			case Byte:
			case Fixed:
			case Ufixed:
			case Identifier:
				{
				setState(304);
				typeName(0);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(307);
			match(T__1);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class StructDefinitionContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public List<VariableDeclarationContext> variableDeclaration() {
			return getRuleContexts(VariableDeclarationContext.class);
		}
		public VariableDeclarationContext variableDeclaration(int i) {
			return getRuleContext(VariableDeclarationContext.class,i);
		}
		public StructDefinitionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_structDefinition; }
	}

	public final StructDefinitionContext structDefinition() throws RecognitionException {
		StructDefinitionContext _localctx = new StructDefinitionContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_structDefinition);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(309);
			match(T__23);
			setState(310);
			identifier();
			setState(311);
			match(T__11);
			setState(322);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__10) | (1L << T__25) | (1L << T__32) | (1L << T__43) | (1L << T__44) | (1L << T__45) | (1L << T__46) | (1L << T__47))) != 0) || ((((_la - 88)) & ~0x3f) == 0 && ((1L << (_la - 88)) & ((1L << (Int - 88)) | (1L << (Uint - 88)) | (1L << (Byte - 88)) | (1L << (Fixed - 88)) | (1L << (Ufixed - 88)) | (1L << (Identifier - 88)))) != 0)) {
				{
				setState(312);
				variableDeclaration();
				setState(313);
				match(T__1);
				setState(319);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__10) | (1L << T__25) | (1L << T__32) | (1L << T__43) | (1L << T__44) | (1L << T__45) | (1L << T__46) | (1L << T__47))) != 0) || ((((_la - 88)) & ~0x3f) == 0 && ((1L << (_la - 88)) & ((1L << (Int - 88)) | (1L << (Uint - 88)) | (1L << (Byte - 88)) | (1L << (Fixed - 88)) | (1L << (Ufixed - 88)) | (1L << (Identifier - 88)))) != 0)) {
					{
					{
					setState(314);
					variableDeclaration();
					setState(315);
					match(T__1);
					}
					}
					setState(321);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
			}

			setState(324);
			match(T__13);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ModifierDefinitionContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public BlockContext block() {
			return getRuleContext(BlockContext.class,0);
		}
		public NatspecContext natspec() {
			return getRuleContext(NatspecContext.class,0);
		}
		public ParameterListContext parameterList() {
			return getRuleContext(ParameterListContext.class,0);
		}
		public ModifierDefinitionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_modifierDefinition; }
	}

	public final ModifierDefinitionContext modifierDefinition() throws RecognitionException {
		ModifierDefinitionContext _localctx = new ModifierDefinitionContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_modifierDefinition);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(327);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==NATSPEC_COMMENT || _la==NATSPEC_LINE_COMMENT) {
				{
				setState(326);
				natspec();
				}
			}

			setState(329);
			match(T__24);
			setState(330);
			identifier();
			setState(332);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__18) {
				{
				setState(331);
				parameterList();
				}
			}

			setState(334);
			block();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ModifierInvocationContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public ExpressionListContext expressionList() {
			return getRuleContext(ExpressionListContext.class,0);
		}
		public ModifierInvocationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_modifierInvocation; }
	}

	public final ModifierInvocationContext modifierInvocation() throws RecognitionException {
		ModifierInvocationContext _localctx = new ModifierInvocationContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_modifierInvocation);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(336);
			identifier();
			setState(342);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__18) {
				{
				setState(337);
				match(T__18);
				setState(339);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__10) | (1L << T__18) | (1L << T__29) | (1L << T__43) | (1L << T__44) | (1L << T__45) | (1L << T__46) | (1L << T__47) | (1L << T__48) | (1L << T__49) | (1L << T__50) | (1L << T__51) | (1L << T__52) | (1L << T__53) | (1L << T__54) | (1L << T__55) | (1L << T__56))) != 0) || ((((_la - 88)) & ~0x3f) == 0 && ((1L << (_la - 88)) & ((1L << (Int - 88)) | (1L << (Uint - 88)) | (1L << (Byte - 88)) | (1L << (Fixed - 88)) | (1L << (Ufixed - 88)) | (1L << (BooleanLiteral - 88)) | (1L << (DecimalNumber - 88)) | (1L << (HexNumber - 88)) | (1L << (HexLiteral - 88)) | (1L << (Identifier - 88)) | (1L << (StringLiteral - 88)))) != 0)) {
					{
					setState(338);
					expressionList();
					}
				}

				setState(341);
				match(T__19);
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FunctionDefinitionContext extends ParserRuleContext {
		public ParameterListContext parameterList() {
			return getRuleContext(ParameterListContext.class,0);
		}
		public ModifierListContext modifierList() {
			return getRuleContext(ModifierListContext.class,0);
		}
		public BlockContext block() {
			return getRuleContext(BlockContext.class,0);
		}
		public NatspecContext natspec() {
			return getRuleContext(NatspecContext.class,0);
		}
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public ReturnParametersContext returnParameters() {
			return getRuleContext(ReturnParametersContext.class,0);
		}
		public FunctionDefinitionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionDefinition; }
	}

	public final FunctionDefinitionContext functionDefinition() throws RecognitionException {
		FunctionDefinitionContext _localctx = new FunctionDefinitionContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_functionDefinition);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(345);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==NATSPEC_COMMENT || _la==NATSPEC_LINE_COMMENT) {
				{
				setState(344);
				natspec();
				}
			}

			setState(347);
			match(T__25);
			setState(349);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__10 || _la==Identifier) {
				{
				setState(348);
				identifier();
				}
			}

			setState(351);
			parameterList();
			setState(352);
			modifierList();
			setState(354);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__26) {
				{
				setState(353);
				returnParameters();
				}
			}

			setState(358);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__1:
				{
				setState(356);
				match(T__1);
				}
				break;
			case T__11:
				{
				setState(357);
				block();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ReturnParametersContext extends ParserRuleContext {
		public ParameterListContext parameterList() {
			return getRuleContext(ParameterListContext.class,0);
		}
		public ReturnParametersContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_returnParameters; }
	}

	public final ReturnParametersContext returnParameters() throws RecognitionException {
		ReturnParametersContext _localctx = new ReturnParametersContext(_ctx, getState());
		enterRule(_localctx, 36, RULE_returnParameters);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(360);
			match(T__26);
			setState(361);
			parameterList();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ModifierListContext extends ParserRuleContext {
		public List<ModifierInvocationContext> modifierInvocation() {
			return getRuleContexts(ModifierInvocationContext.class);
		}
		public ModifierInvocationContext modifierInvocation(int i) {
			return getRuleContext(ModifierInvocationContext.class,i);
		}
		public List<StateMutabilityContext> stateMutability() {
			return getRuleContexts(StateMutabilityContext.class);
		}
		public StateMutabilityContext stateMutability(int i) {
			return getRuleContext(StateMutabilityContext.class,i);
		}
		public List<TerminalNode> ExternalKeyword() { return getTokens(SolidityParser.ExternalKeyword); }
		public TerminalNode ExternalKeyword(int i) {
			return getToken(SolidityParser.ExternalKeyword, i);
		}
		public List<TerminalNode> PublicKeyword() { return getTokens(SolidityParser.PublicKeyword); }
		public TerminalNode PublicKeyword(int i) {
			return getToken(SolidityParser.PublicKeyword, i);
		}
		public List<TerminalNode> InternalKeyword() { return getTokens(SolidityParser.InternalKeyword); }
		public TerminalNode InternalKeyword(int i) {
			return getToken(SolidityParser.InternalKeyword, i);
		}
		public List<TerminalNode> PrivateKeyword() { return getTokens(SolidityParser.PrivateKeyword); }
		public TerminalNode PrivateKeyword(int i) {
			return getToken(SolidityParser.PrivateKeyword, i);
		}
		public ModifierListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_modifierList; }
	}

	public final ModifierListContext modifierList() throws RecognitionException {
		ModifierListContext _localctx = new ModifierListContext(_ctx, getState());
		enterRule(_localctx, 38, RULE_modifierList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(371);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__10 || ((((_la - 102)) & ~0x3f) == 0 && ((1L << (_la - 102)) & ((1L << (ConstantKeyword - 102)) | (1L << (ExternalKeyword - 102)) | (1L << (InternalKeyword - 102)) | (1L << (PayableKeyword - 102)) | (1L << (PrivateKeyword - 102)) | (1L << (PublicKeyword - 102)) | (1L << (PureKeyword - 102)) | (1L << (ViewKeyword - 102)) | (1L << (Identifier - 102)))) != 0)) {
				{
				setState(369);
				_errHandler.sync(this);
				switch (_input.LA(1)) {
				case T__10:
				case Identifier:
					{
					setState(363);
					modifierInvocation();
					}
					break;
				case ConstantKeyword:
				case PayableKeyword:
				case PureKeyword:
				case ViewKeyword:
					{
					setState(364);
					stateMutability();
					}
					break;
				case ExternalKeyword:
					{
					setState(365);
					match(ExternalKeyword);
					}
					break;
				case PublicKeyword:
					{
					setState(366);
					match(PublicKeyword);
					}
					break;
				case InternalKeyword:
					{
					setState(367);
					match(InternalKeyword);
					}
					break;
				case PrivateKeyword:
					{
					setState(368);
					match(PrivateKeyword);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				setState(373);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class EventDefinitionContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public EventParameterListContext eventParameterList() {
			return getRuleContext(EventParameterListContext.class,0);
		}
		public NatspecContext natspec() {
			return getRuleContext(NatspecContext.class,0);
		}
		public TerminalNode AnonymousKeyword() { return getToken(SolidityParser.AnonymousKeyword, 0); }
		public EventDefinitionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_eventDefinition; }
	}

	public final EventDefinitionContext eventDefinition() throws RecognitionException {
		EventDefinitionContext _localctx = new EventDefinitionContext(_ctx, getState());
		enterRule(_localctx, 40, RULE_eventDefinition);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(375);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==NATSPEC_COMMENT || _la==NATSPEC_LINE_COMMENT) {
				{
				setState(374);
				natspec();
				}
			}

			setState(377);
			match(T__27);
			setState(378);
			identifier();
			setState(379);
			eventParameterList();
			setState(381);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==AnonymousKeyword) {
				{
				setState(380);
				match(AnonymousKeyword);
				}
			}

			setState(383);
			match(T__1);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class EnumValueContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public EnumValueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_enumValue; }
	}

	public final EnumValueContext enumValue() throws RecognitionException {
		EnumValueContext _localctx = new EnumValueContext(_ctx, getState());
		enterRule(_localctx, 42, RULE_enumValue);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(385);
			identifier();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class EnumDefinitionContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public NatspecContext natspec() {
			return getRuleContext(NatspecContext.class,0);
		}
		public List<EnumValueContext> enumValue() {
			return getRuleContexts(EnumValueContext.class);
		}
		public EnumValueContext enumValue(int i) {
			return getRuleContext(EnumValueContext.class,i);
		}
		public EnumDefinitionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_enumDefinition; }
	}

	public final EnumDefinitionContext enumDefinition() throws RecognitionException {
		EnumDefinitionContext _localctx = new EnumDefinitionContext(_ctx, getState());
		enterRule(_localctx, 44, RULE_enumDefinition);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(388);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==NATSPEC_COMMENT || _la==NATSPEC_LINE_COMMENT) {
				{
				setState(387);
				natspec();
				}
			}

			setState(390);
			match(T__28);
			setState(391);
			identifier();
			setState(392);
			match(T__11);
			setState(394);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__10 || _la==Identifier) {
				{
				setState(393);
				enumValue();
				}
			}

			setState(400);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__12) {
				{
				{
				setState(396);
				match(T__12);
				setState(397);
				enumValue();
				}
				}
				setState(402);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(403);
			match(T__13);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ParameterListContext extends ParserRuleContext {
		public List<ParameterContext> parameter() {
			return getRuleContexts(ParameterContext.class);
		}
		public ParameterContext parameter(int i) {
			return getRuleContext(ParameterContext.class,i);
		}
		public ParameterListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_parameterList; }
	}

	public final ParameterListContext parameterList() throws RecognitionException {
		ParameterListContext _localctx = new ParameterListContext(_ctx, getState());
		enterRule(_localctx, 46, RULE_parameterList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(405);
			match(T__18);
			setState(414);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__10) | (1L << T__25) | (1L << T__32) | (1L << T__43) | (1L << T__44) | (1L << T__45) | (1L << T__46) | (1L << T__47))) != 0) || ((((_la - 88)) & ~0x3f) == 0 && ((1L << (_la - 88)) & ((1L << (Int - 88)) | (1L << (Uint - 88)) | (1L << (Byte - 88)) | (1L << (Fixed - 88)) | (1L << (Ufixed - 88)) | (1L << (Identifier - 88)))) != 0)) {
				{
				setState(406);
				parameter();
				setState(411);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==T__12) {
					{
					{
					setState(407);
					match(T__12);
					setState(408);
					parameter();
					}
					}
					setState(413);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
			}

			setState(416);
			match(T__19);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ParameterContext extends ParserRuleContext {
		public TypeNameContext typeName() {
			return getRuleContext(TypeNameContext.class,0);
		}
		public StorageLocationContext storageLocation() {
			return getRuleContext(StorageLocationContext.class,0);
		}
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public ParameterContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_parameter; }
	}

	public final ParameterContext parameter() throws RecognitionException {
		ParameterContext _localctx = new ParameterContext(_ctx, getState());
		enterRule(_localctx, 48, RULE_parameter);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(418);
			typeName(0);
			setState(420);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__34 || _la==T__35) {
				{
				setState(419);
				storageLocation();
				}
			}

			setState(423);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__10 || _la==Identifier) {
				{
				setState(422);
				identifier();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class EventParameterListContext extends ParserRuleContext {
		public List<EventParameterContext> eventParameter() {
			return getRuleContexts(EventParameterContext.class);
		}
		public EventParameterContext eventParameter(int i) {
			return getRuleContext(EventParameterContext.class,i);
		}
		public EventParameterListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_eventParameterList; }
	}

	public final EventParameterListContext eventParameterList() throws RecognitionException {
		EventParameterListContext _localctx = new EventParameterListContext(_ctx, getState());
		enterRule(_localctx, 50, RULE_eventParameterList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(425);
			match(T__18);
			setState(434);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__10) | (1L << T__25) | (1L << T__32) | (1L << T__43) | (1L << T__44) | (1L << T__45) | (1L << T__46) | (1L << T__47))) != 0) || ((((_la - 88)) & ~0x3f) == 0 && ((1L << (_la - 88)) & ((1L << (Int - 88)) | (1L << (Uint - 88)) | (1L << (Byte - 88)) | (1L << (Fixed - 88)) | (1L << (Ufixed - 88)) | (1L << (Identifier - 88)))) != 0)) {
				{
				setState(426);
				eventParameter();
				setState(431);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==T__12) {
					{
					{
					setState(427);
					match(T__12);
					setState(428);
					eventParameter();
					}
					}
					setState(433);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
			}

			setState(436);
			match(T__19);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class EventParameterContext extends ParserRuleContext {
		public TypeNameContext typeName() {
			return getRuleContext(TypeNameContext.class,0);
		}
		public TerminalNode IndexedKeyword() { return getToken(SolidityParser.IndexedKeyword, 0); }
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public EventParameterContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_eventParameter; }
	}

	public final EventParameterContext eventParameter() throws RecognitionException {
		EventParameterContext _localctx = new EventParameterContext(_ctx, getState());
		enterRule(_localctx, 52, RULE_eventParameter);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(438);
			typeName(0);
			setState(440);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==IndexedKeyword) {
				{
				setState(439);
				match(IndexedKeyword);
				}
			}

			setState(443);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__10 || _la==Identifier) {
				{
				setState(442);
				identifier();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FunctionTypeParameterListContext extends ParserRuleContext {
		public List<FunctionTypeParameterContext> functionTypeParameter() {
			return getRuleContexts(FunctionTypeParameterContext.class);
		}
		public FunctionTypeParameterContext functionTypeParameter(int i) {
			return getRuleContext(FunctionTypeParameterContext.class,i);
		}
		public FunctionTypeParameterListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionTypeParameterList; }
	}

	public final FunctionTypeParameterListContext functionTypeParameterList() throws RecognitionException {
		FunctionTypeParameterListContext _localctx = new FunctionTypeParameterListContext(_ctx, getState());
		enterRule(_localctx, 54, RULE_functionTypeParameterList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(445);
			match(T__18);
			setState(454);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__10) | (1L << T__25) | (1L << T__32) | (1L << T__43) | (1L << T__44) | (1L << T__45) | (1L << T__46) | (1L << T__47))) != 0) || ((((_la - 88)) & ~0x3f) == 0 && ((1L << (_la - 88)) & ((1L << (Int - 88)) | (1L << (Uint - 88)) | (1L << (Byte - 88)) | (1L << (Fixed - 88)) | (1L << (Ufixed - 88)) | (1L << (Identifier - 88)))) != 0)) {
				{
				setState(446);
				functionTypeParameter();
				setState(451);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==T__12) {
					{
					{
					setState(447);
					match(T__12);
					setState(448);
					functionTypeParameter();
					}
					}
					setState(453);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
			}

			setState(456);
			match(T__19);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FunctionTypeParameterContext extends ParserRuleContext {
		public TypeNameContext typeName() {
			return getRuleContext(TypeNameContext.class,0);
		}
		public StorageLocationContext storageLocation() {
			return getRuleContext(StorageLocationContext.class,0);
		}
		public FunctionTypeParameterContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionTypeParameter; }
	}

	public final FunctionTypeParameterContext functionTypeParameter() throws RecognitionException {
		FunctionTypeParameterContext _localctx = new FunctionTypeParameterContext(_ctx, getState());
		enterRule(_localctx, 56, RULE_functionTypeParameter);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(458);
			typeName(0);
			setState(460);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__34 || _la==T__35) {
				{
				setState(459);
				storageLocation();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class VariableDeclarationContext extends ParserRuleContext {
		public TypeNameContext typeName() {
			return getRuleContext(TypeNameContext.class,0);
		}
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public StorageLocationContext storageLocation() {
			return getRuleContext(StorageLocationContext.class,0);
		}
		public VariableDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_variableDeclaration; }
	}

	public final VariableDeclarationContext variableDeclaration() throws RecognitionException {
		VariableDeclarationContext _localctx = new VariableDeclarationContext(_ctx, getState());
		enterRule(_localctx, 58, RULE_variableDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(462);
			typeName(0);
			setState(464);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__34 || _la==T__35) {
				{
				setState(463);
				storageLocation();
				}
			}

			setState(466);
			identifier();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TypeNameContext extends ParserRuleContext {
		public ElementaryTypeNameContext elementaryTypeName() {
			return getRuleContext(ElementaryTypeNameContext.class,0);
		}
		public UserDefinedTypeNameContext userDefinedTypeName() {
			return getRuleContext(UserDefinedTypeNameContext.class,0);
		}
		public MappingContext mapping() {
			return getRuleContext(MappingContext.class,0);
		}
		public FunctionTypeNameContext functionTypeName() {
			return getRuleContext(FunctionTypeNameContext.class,0);
		}
		public TypeNameContext typeName() {
			return getRuleContext(TypeNameContext.class,0);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TypeNameContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_typeName; }
	}

	public final TypeNameContext typeName() throws RecognitionException {
		return typeName(0);
	}

	private TypeNameContext typeName(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		TypeNameContext _localctx = new TypeNameContext(_ctx, _parentState);
		TypeNameContext _prevctx = _localctx;
		int _startState = 60;
		enterRecursionRule(_localctx, 60, RULE_typeName, _p);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(473);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__43:
			case T__44:
			case T__45:
			case T__46:
			case T__47:
			case Int:
			case Uint:
			case Byte:
			case Fixed:
			case Ufixed:
				{
				setState(469);
				elementaryTypeName();
				}
				break;
			case T__10:
			case Identifier:
				{
				setState(470);
				userDefinedTypeName();
				}
				break;
			case T__32:
				{
				setState(471);
				mapping();
				}
				break;
			case T__25:
				{
				setState(472);
				functionTypeName();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			_ctx.stop = _input.LT(-1);
			setState(483);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,53,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new TypeNameContext(_parentctx, _parentState);
					pushNewRecursionContext(_localctx, _startState, RULE_typeName);
					setState(475);
					if (!(precpred(_ctx, 2))) throw new FailedPredicateException(this, "precpred(_ctx, 2)");
					setState(476);
					match(T__29);
					setState(478);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__10) | (1L << T__18) | (1L << T__29) | (1L << T__43) | (1L << T__44) | (1L << T__45) | (1L << T__46) | (1L << T__47) | (1L << T__48) | (1L << T__49) | (1L << T__50) | (1L << T__51) | (1L << T__52) | (1L << T__53) | (1L << T__54) | (1L << T__55) | (1L << T__56))) != 0) || ((((_la - 88)) & ~0x3f) == 0 && ((1L << (_la - 88)) & ((1L << (Int - 88)) | (1L << (Uint - 88)) | (1L << (Byte - 88)) | (1L << (Fixed - 88)) | (1L << (Ufixed - 88)) | (1L << (BooleanLiteral - 88)) | (1L << (DecimalNumber - 88)) | (1L << (HexNumber - 88)) | (1L << (HexLiteral - 88)) | (1L << (Identifier - 88)) | (1L << (StringLiteral - 88)))) != 0)) {
						{
						setState(477);
						expression(0);
						}
					}

					setState(480);
					match(T__30);
					}
					} 
				}
				setState(485);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,53,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public static class UserDefinedTypeNameContext extends ParserRuleContext {
		public List<IdentifierContext> identifier() {
			return getRuleContexts(IdentifierContext.class);
		}
		public IdentifierContext identifier(int i) {
			return getRuleContext(IdentifierContext.class,i);
		}
		public UserDefinedTypeNameContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_userDefinedTypeName; }
	}

	public final UserDefinedTypeNameContext userDefinedTypeName() throws RecognitionException {
		UserDefinedTypeNameContext _localctx = new UserDefinedTypeNameContext(_ctx, getState());
		enterRule(_localctx, 62, RULE_userDefinedTypeName);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(486);
			identifier();
			setState(491);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,54,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(487);
					match(T__31);
					setState(488);
					identifier();
					}
					} 
				}
				setState(493);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,54,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class MappingContext extends ParserRuleContext {
		public ElementaryTypeNameContext elementaryTypeName() {
			return getRuleContext(ElementaryTypeNameContext.class,0);
		}
		public TypeNameContext typeName() {
			return getRuleContext(TypeNameContext.class,0);
		}
		public MappingContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_mapping; }
	}

	public final MappingContext mapping() throws RecognitionException {
		MappingContext _localctx = new MappingContext(_ctx, getState());
		enterRule(_localctx, 64, RULE_mapping);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(494);
			match(T__32);
			setState(495);
			match(T__18);
			setState(496);
			elementaryTypeName();
			setState(497);
			match(T__33);
			setState(498);
			typeName(0);
			setState(499);
			match(T__19);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FunctionTypeNameContext extends ParserRuleContext {
		public List<FunctionTypeParameterListContext> functionTypeParameterList() {
			return getRuleContexts(FunctionTypeParameterListContext.class);
		}
		public FunctionTypeParameterListContext functionTypeParameterList(int i) {
			return getRuleContext(FunctionTypeParameterListContext.class,i);
		}
		public List<TerminalNode> InternalKeyword() { return getTokens(SolidityParser.InternalKeyword); }
		public TerminalNode InternalKeyword(int i) {
			return getToken(SolidityParser.InternalKeyword, i);
		}
		public List<TerminalNode> ExternalKeyword() { return getTokens(SolidityParser.ExternalKeyword); }
		public TerminalNode ExternalKeyword(int i) {
			return getToken(SolidityParser.ExternalKeyword, i);
		}
		public List<StateMutabilityContext> stateMutability() {
			return getRuleContexts(StateMutabilityContext.class);
		}
		public StateMutabilityContext stateMutability(int i) {
			return getRuleContext(StateMutabilityContext.class,i);
		}
		public FunctionTypeNameContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionTypeName; }
	}

	public final FunctionTypeNameContext functionTypeName() throws RecognitionException {
		FunctionTypeNameContext _localctx = new FunctionTypeNameContext(_ctx, getState());
		enterRule(_localctx, 66, RULE_functionTypeName);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(501);
			match(T__25);
			setState(502);
			functionTypeParameterList();
			setState(508);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,56,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(506);
					_errHandler.sync(this);
					switch (_input.LA(1)) {
					case InternalKeyword:
						{
						setState(503);
						match(InternalKeyword);
						}
						break;
					case ExternalKeyword:
						{
						setState(504);
						match(ExternalKeyword);
						}
						break;
					case ConstantKeyword:
					case PayableKeyword:
					case PureKeyword:
					case ViewKeyword:
						{
						setState(505);
						stateMutability();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					} 
				}
				setState(510);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,56,_ctx);
			}
			setState(513);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,57,_ctx) ) {
			case 1:
				{
				setState(511);
				match(T__26);
				setState(512);
				functionTypeParameterList();
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class StorageLocationContext extends ParserRuleContext {
		public StorageLocationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_storageLocation; }
	}

	public final StorageLocationContext storageLocation() throws RecognitionException {
		StorageLocationContext _localctx = new StorageLocationContext(_ctx, getState());
		enterRule(_localctx, 68, RULE_storageLocation);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(515);
			_la = _input.LA(1);
			if ( !(_la==T__34 || _la==T__35) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class StateMutabilityContext extends ParserRuleContext {
		public TerminalNode PureKeyword() { return getToken(SolidityParser.PureKeyword, 0); }
		public TerminalNode ConstantKeyword() { return getToken(SolidityParser.ConstantKeyword, 0); }
		public TerminalNode ViewKeyword() { return getToken(SolidityParser.ViewKeyword, 0); }
		public TerminalNode PayableKeyword() { return getToken(SolidityParser.PayableKeyword, 0); }
		public StateMutabilityContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_stateMutability; }
	}

	public final StateMutabilityContext stateMutability() throws RecognitionException {
		StateMutabilityContext _localctx = new StateMutabilityContext(_ctx, getState());
		enterRule(_localctx, 70, RULE_stateMutability);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(517);
			_la = _input.LA(1);
			if ( !(((((_la - 102)) & ~0x3f) == 0 && ((1L << (_la - 102)) & ((1L << (ConstantKeyword - 102)) | (1L << (PayableKeyword - 102)) | (1L << (PureKeyword - 102)) | (1L << (ViewKeyword - 102)))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BlockContext extends ParserRuleContext {
		public List<StatementContext> statement() {
			return getRuleContexts(StatementContext.class);
		}
		public StatementContext statement(int i) {
			return getRuleContext(StatementContext.class,i);
		}
		public BlockContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_block; }
	}

	public final BlockContext block() throws RecognitionException {
		BlockContext _localctx = new BlockContext(_ctx, getState());
		enterRule(_localctx, 72, RULE_block);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(519);
			match(T__11);
			setState(523);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__10) | (1L << T__11) | (1L << T__18) | (1L << T__22) | (1L << T__25) | (1L << T__29) | (1L << T__32) | (1L << T__36) | (1L << T__38) | (1L << T__39) | (1L << T__40) | (1L << T__41) | (1L << T__42) | (1L << T__43) | (1L << T__44) | (1L << T__45) | (1L << T__46) | (1L << T__47) | (1L << T__48) | (1L << T__49) | (1L << T__50) | (1L << T__51) | (1L << T__52) | (1L << T__53) | (1L << T__54) | (1L << T__55) | (1L << T__56))) != 0) || ((((_la - 88)) & ~0x3f) == 0 && ((1L << (_la - 88)) & ((1L << (Int - 88)) | (1L << (Uint - 88)) | (1L << (Byte - 88)) | (1L << (Fixed - 88)) | (1L << (Ufixed - 88)) | (1L << (BooleanLiteral - 88)) | (1L << (DecimalNumber - 88)) | (1L << (HexNumber - 88)) | (1L << (HexLiteral - 88)) | (1L << (BreakKeyword - 88)) | (1L << (ContinueKeyword - 88)) | (1L << (Identifier - 88)) | (1L << (StringLiteral - 88)))) != 0)) {
				{
				{
				setState(520);
				statement();
				}
				}
				setState(525);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(526);
			match(T__13);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class StatementContext extends ParserRuleContext {
		public IfStatementContext ifStatement() {
			return getRuleContext(IfStatementContext.class,0);
		}
		public WhileStatementContext whileStatement() {
			return getRuleContext(WhileStatementContext.class,0);
		}
		public ForStatementContext forStatement() {
			return getRuleContext(ForStatementContext.class,0);
		}
		public BlockContext block() {
			return getRuleContext(BlockContext.class,0);
		}
		public InlineAssemblyStatementContext inlineAssemblyStatement() {
			return getRuleContext(InlineAssemblyStatementContext.class,0);
		}
		public DoWhileStatementContext doWhileStatement() {
			return getRuleContext(DoWhileStatementContext.class,0);
		}
		public ContinueStatementContext continueStatement() {
			return getRuleContext(ContinueStatementContext.class,0);
		}
		public BreakStatementContext breakStatement() {
			return getRuleContext(BreakStatementContext.class,0);
		}
		public ReturnStatementContext returnStatement() {
			return getRuleContext(ReturnStatementContext.class,0);
		}
		public ThrowStatementContext throwStatement() {
			return getRuleContext(ThrowStatementContext.class,0);
		}
		public SimpleStatementContext simpleStatement() {
			return getRuleContext(SimpleStatementContext.class,0);
		}
		public StatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_statement; }
	}

	public final StatementContext statement() throws RecognitionException {
		StatementContext _localctx = new StatementContext(_ctx, getState());
		enterRule(_localctx, 74, RULE_statement);
		try {
			setState(539);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__36:
				enterOuterAlt(_localctx, 1);
				{
				setState(528);
				ifStatement();
				}
				break;
			case T__38:
				enterOuterAlt(_localctx, 2);
				{
				setState(529);
				whileStatement();
				}
				break;
			case T__22:
				enterOuterAlt(_localctx, 3);
				{
				setState(530);
				forStatement();
				}
				break;
			case T__11:
				enterOuterAlt(_localctx, 4);
				{
				setState(531);
				block();
				}
				break;
			case T__39:
				enterOuterAlt(_localctx, 5);
				{
				setState(532);
				inlineAssemblyStatement();
				}
				break;
			case T__40:
				enterOuterAlt(_localctx, 6);
				{
				setState(533);
				doWhileStatement();
				}
				break;
			case ContinueKeyword:
				enterOuterAlt(_localctx, 7);
				{
				setState(534);
				continueStatement();
				}
				break;
			case BreakKeyword:
				enterOuterAlt(_localctx, 8);
				{
				setState(535);
				breakStatement();
				}
				break;
			case T__41:
				enterOuterAlt(_localctx, 9);
				{
				setState(536);
				returnStatement();
				}
				break;
			case T__42:
				enterOuterAlt(_localctx, 10);
				{
				setState(537);
				throwStatement();
				}
				break;
			case T__10:
			case T__18:
			case T__25:
			case T__29:
			case T__32:
			case T__43:
			case T__44:
			case T__45:
			case T__46:
			case T__47:
			case T__48:
			case T__49:
			case T__50:
			case T__51:
			case T__52:
			case T__53:
			case T__54:
			case T__55:
			case T__56:
			case Int:
			case Uint:
			case Byte:
			case Fixed:
			case Ufixed:
			case BooleanLiteral:
			case DecimalNumber:
			case HexNumber:
			case HexLiteral:
			case Identifier:
			case StringLiteral:
				enterOuterAlt(_localctx, 11);
				{
				setState(538);
				simpleStatement();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExpressionStatementContext extends ParserRuleContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public ExpressionStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expressionStatement; }
	}

	public final ExpressionStatementContext expressionStatement() throws RecognitionException {
		ExpressionStatementContext _localctx = new ExpressionStatementContext(_ctx, getState());
		enterRule(_localctx, 76, RULE_expressionStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(541);
			expression(0);
			setState(542);
			match(T__1);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class IfStatementContext extends ParserRuleContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public List<StatementContext> statement() {
			return getRuleContexts(StatementContext.class);
		}
		public StatementContext statement(int i) {
			return getRuleContext(StatementContext.class,i);
		}
		public IfStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ifStatement; }
	}

	public final IfStatementContext ifStatement() throws RecognitionException {
		IfStatementContext _localctx = new IfStatementContext(_ctx, getState());
		enterRule(_localctx, 78, RULE_ifStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(544);
			match(T__36);
			setState(545);
			match(T__18);
			setState(546);
			expression(0);
			setState(547);
			match(T__19);
			setState(548);
			statement();
			setState(551);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,60,_ctx) ) {
			case 1:
				{
				setState(549);
				match(T__37);
				setState(550);
				statement();
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class WhileStatementContext extends ParserRuleContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public StatementContext statement() {
			return getRuleContext(StatementContext.class,0);
		}
		public WhileStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_whileStatement; }
	}

	public final WhileStatementContext whileStatement() throws RecognitionException {
		WhileStatementContext _localctx = new WhileStatementContext(_ctx, getState());
		enterRule(_localctx, 80, RULE_whileStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(553);
			match(T__38);
			setState(554);
			match(T__18);
			setState(555);
			expression(0);
			setState(556);
			match(T__19);
			setState(557);
			statement();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SimpleStatementContext extends ParserRuleContext {
		public VariableDeclarationStatementContext variableDeclarationStatement() {
			return getRuleContext(VariableDeclarationStatementContext.class,0);
		}
		public ExpressionStatementContext expressionStatement() {
			return getRuleContext(ExpressionStatementContext.class,0);
		}
		public SimpleStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_simpleStatement; }
	}

	public final SimpleStatementContext simpleStatement() throws RecognitionException {
		SimpleStatementContext _localctx = new SimpleStatementContext(_ctx, getState());
		enterRule(_localctx, 82, RULE_simpleStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(561);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,61,_ctx) ) {
			case 1:
				{
				setState(559);
				variableDeclarationStatement();
				}
				break;
			case 2:
				{
				setState(560);
				expressionStatement();
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ForStatementContext extends ParserRuleContext {
		public StatementContext statement() {
			return getRuleContext(StatementContext.class,0);
		}
		public SimpleStatementContext simpleStatement() {
			return getRuleContext(SimpleStatementContext.class,0);
		}
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public ForStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_forStatement; }
	}

	public final ForStatementContext forStatement() throws RecognitionException {
		ForStatementContext _localctx = new ForStatementContext(_ctx, getState());
		enterRule(_localctx, 84, RULE_forStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(563);
			match(T__22);
			setState(564);
			match(T__18);
			setState(567);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__10:
			case T__18:
			case T__25:
			case T__29:
			case T__32:
			case T__43:
			case T__44:
			case T__45:
			case T__46:
			case T__47:
			case T__48:
			case T__49:
			case T__50:
			case T__51:
			case T__52:
			case T__53:
			case T__54:
			case T__55:
			case T__56:
			case Int:
			case Uint:
			case Byte:
			case Fixed:
			case Ufixed:
			case BooleanLiteral:
			case DecimalNumber:
			case HexNumber:
			case HexLiteral:
			case Identifier:
			case StringLiteral:
				{
				setState(565);
				simpleStatement();
				}
				break;
			case T__1:
				{
				setState(566);
				match(T__1);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(570);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__10) | (1L << T__18) | (1L << T__29) | (1L << T__43) | (1L << T__44) | (1L << T__45) | (1L << T__46) | (1L << T__47) | (1L << T__48) | (1L << T__49) | (1L << T__50) | (1L << T__51) | (1L << T__52) | (1L << T__53) | (1L << T__54) | (1L << T__55) | (1L << T__56))) != 0) || ((((_la - 88)) & ~0x3f) == 0 && ((1L << (_la - 88)) & ((1L << (Int - 88)) | (1L << (Uint - 88)) | (1L << (Byte - 88)) | (1L << (Fixed - 88)) | (1L << (Ufixed - 88)) | (1L << (BooleanLiteral - 88)) | (1L << (DecimalNumber - 88)) | (1L << (HexNumber - 88)) | (1L << (HexLiteral - 88)) | (1L << (Identifier - 88)) | (1L << (StringLiteral - 88)))) != 0)) {
				{
				setState(569);
				expression(0);
				}
			}

			setState(572);
			match(T__1);
			setState(574);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__10) | (1L << T__18) | (1L << T__29) | (1L << T__43) | (1L << T__44) | (1L << T__45) | (1L << T__46) | (1L << T__47) | (1L << T__48) | (1L << T__49) | (1L << T__50) | (1L << T__51) | (1L << T__52) | (1L << T__53) | (1L << T__54) | (1L << T__55) | (1L << T__56))) != 0) || ((((_la - 88)) & ~0x3f) == 0 && ((1L << (_la - 88)) & ((1L << (Int - 88)) | (1L << (Uint - 88)) | (1L << (Byte - 88)) | (1L << (Fixed - 88)) | (1L << (Ufixed - 88)) | (1L << (BooleanLiteral - 88)) | (1L << (DecimalNumber - 88)) | (1L << (HexNumber - 88)) | (1L << (HexLiteral - 88)) | (1L << (Identifier - 88)) | (1L << (StringLiteral - 88)))) != 0)) {
				{
				setState(573);
				expression(0);
				}
			}

			setState(576);
			match(T__19);
			setState(577);
			statement();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class InlineAssemblyStatementContext extends ParserRuleContext {
		public AssemblyBlockContext assemblyBlock() {
			return getRuleContext(AssemblyBlockContext.class,0);
		}
		public TerminalNode StringLiteral() { return getToken(SolidityParser.StringLiteral, 0); }
		public InlineAssemblyStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_inlineAssemblyStatement; }
	}

	public final InlineAssemblyStatementContext inlineAssemblyStatement() throws RecognitionException {
		InlineAssemblyStatementContext _localctx = new InlineAssemblyStatementContext(_ctx, getState());
		enterRule(_localctx, 86, RULE_inlineAssemblyStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(579);
			match(T__39);
			setState(581);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==StringLiteral) {
				{
				setState(580);
				match(StringLiteral);
				}
			}

			setState(583);
			assemblyBlock();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DoWhileStatementContext extends ParserRuleContext {
		public StatementContext statement() {
			return getRuleContext(StatementContext.class,0);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public DoWhileStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_doWhileStatement; }
	}

	public final DoWhileStatementContext doWhileStatement() throws RecognitionException {
		DoWhileStatementContext _localctx = new DoWhileStatementContext(_ctx, getState());
		enterRule(_localctx, 88, RULE_doWhileStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(585);
			match(T__40);
			setState(586);
			statement();
			setState(587);
			match(T__38);
			setState(588);
			match(T__18);
			setState(589);
			expression(0);
			setState(590);
			match(T__19);
			setState(591);
			match(T__1);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ContinueStatementContext extends ParserRuleContext {
		public ContinueStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_continueStatement; }
	}

	public final ContinueStatementContext continueStatement() throws RecognitionException {
		ContinueStatementContext _localctx = new ContinueStatementContext(_ctx, getState());
		enterRule(_localctx, 90, RULE_continueStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(593);
			match(ContinueKeyword);
			setState(594);
			match(T__1);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BreakStatementContext extends ParserRuleContext {
		public BreakStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_breakStatement; }
	}

	public final BreakStatementContext breakStatement() throws RecognitionException {
		BreakStatementContext _localctx = new BreakStatementContext(_ctx, getState());
		enterRule(_localctx, 92, RULE_breakStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(596);
			match(BreakKeyword);
			setState(597);
			match(T__1);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ReturnStatementContext extends ParserRuleContext {
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public ReturnStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_returnStatement; }
	}

	public final ReturnStatementContext returnStatement() throws RecognitionException {
		ReturnStatementContext _localctx = new ReturnStatementContext(_ctx, getState());
		enterRule(_localctx, 94, RULE_returnStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(599);
			match(T__41);
			setState(601);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__10) | (1L << T__18) | (1L << T__29) | (1L << T__43) | (1L << T__44) | (1L << T__45) | (1L << T__46) | (1L << T__47) | (1L << T__48) | (1L << T__49) | (1L << T__50) | (1L << T__51) | (1L << T__52) | (1L << T__53) | (1L << T__54) | (1L << T__55) | (1L << T__56))) != 0) || ((((_la - 88)) & ~0x3f) == 0 && ((1L << (_la - 88)) & ((1L << (Int - 88)) | (1L << (Uint - 88)) | (1L << (Byte - 88)) | (1L << (Fixed - 88)) | (1L << (Ufixed - 88)) | (1L << (BooleanLiteral - 88)) | (1L << (DecimalNumber - 88)) | (1L << (HexNumber - 88)) | (1L << (HexLiteral - 88)) | (1L << (Identifier - 88)) | (1L << (StringLiteral - 88)))) != 0)) {
				{
				setState(600);
				expression(0);
				}
			}

			setState(603);
			match(T__1);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ThrowStatementContext extends ParserRuleContext {
		public ThrowStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_throwStatement; }
	}

	public final ThrowStatementContext throwStatement() throws RecognitionException {
		ThrowStatementContext _localctx = new ThrowStatementContext(_ctx, getState());
		enterRule(_localctx, 96, RULE_throwStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(605);
			match(T__42);
			setState(606);
			match(T__1);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class VariableDeclarationStatementContext extends ParserRuleContext {
		public IdentifierListContext identifierList() {
			return getRuleContext(IdentifierListContext.class,0);
		}
		public VariableDeclarationContext variableDeclaration() {
			return getRuleContext(VariableDeclarationContext.class,0);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public VariableDeclarationStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_variableDeclarationStatement; }
	}

	public final VariableDeclarationStatementContext variableDeclarationStatement() throws RecognitionException {
		VariableDeclarationStatementContext _localctx = new VariableDeclarationStatementContext(_ctx, getState());
		enterRule(_localctx, 98, RULE_variableDeclarationStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(611);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,67,_ctx) ) {
			case 1:
				{
				setState(608);
				match(T__43);
				setState(609);
				identifierList();
				}
				break;
			case 2:
				{
				setState(610);
				variableDeclaration();
				}
				break;
			}
			setState(615);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__20) {
				{
				setState(613);
				match(T__20);
				setState(614);
				expression(0);
				}
			}

			setState(617);
			match(T__1);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class IdentifierListContext extends ParserRuleContext {
		public List<IdentifierContext> identifier() {
			return getRuleContexts(IdentifierContext.class);
		}
		public IdentifierContext identifier(int i) {
			return getRuleContext(IdentifierContext.class,i);
		}
		public IdentifierListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_identifierList; }
	}

	public final IdentifierListContext identifierList() throws RecognitionException {
		IdentifierListContext _localctx = new IdentifierListContext(_ctx, getState());
		enterRule(_localctx, 100, RULE_identifierList);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(619);
			match(T__18);
			setState(626);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,70,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(621);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if (_la==T__10 || _la==Identifier) {
						{
						setState(620);
						identifier();
						}
					}

					setState(623);
					match(T__12);
					}
					} 
				}
				setState(628);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,70,_ctx);
			}
			setState(630);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__10 || _la==Identifier) {
				{
				setState(629);
				identifier();
				}
			}

			setState(632);
			match(T__19);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ElementaryTypeNameContext extends ParserRuleContext {
		public TerminalNode Int() { return getToken(SolidityParser.Int, 0); }
		public TerminalNode Uint() { return getToken(SolidityParser.Uint, 0); }
		public TerminalNode Byte() { return getToken(SolidityParser.Byte, 0); }
		public TerminalNode Fixed() { return getToken(SolidityParser.Fixed, 0); }
		public TerminalNode Ufixed() { return getToken(SolidityParser.Ufixed, 0); }
		public ElementaryTypeNameContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_elementaryTypeName; }
	}

	public final ElementaryTypeNameContext elementaryTypeName() throws RecognitionException {
		ElementaryTypeNameContext _localctx = new ElementaryTypeNameContext(_ctx, getState());
		enterRule(_localctx, 102, RULE_elementaryTypeName);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(634);
			_la = _input.LA(1);
			if ( !(((((_la - 44)) & ~0x3f) == 0 && ((1L << (_la - 44)) & ((1L << (T__43 - 44)) | (1L << (T__44 - 44)) | (1L << (T__45 - 44)) | (1L << (T__46 - 44)) | (1L << (T__47 - 44)) | (1L << (Int - 44)) | (1L << (Uint - 44)) | (1L << (Byte - 44)) | (1L << (Fixed - 44)) | (1L << (Ufixed - 44)))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExpressionContext extends ParserRuleContext {
		public TypeNameContext typeName() {
			return getRuleContext(TypeNameContext.class,0);
		}
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public PrimaryExpressionContext primaryExpression() {
			return getRuleContext(PrimaryExpressionContext.class,0);
		}
		public FunctionCallArgumentsContext functionCallArguments() {
			return getRuleContext(FunctionCallArgumentsContext.class,0);
		}
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public ExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expression; }
	}

	public final ExpressionContext expression() throws RecognitionException {
		return expression(0);
	}

	private ExpressionContext expression(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		ExpressionContext _localctx = new ExpressionContext(_ctx, _parentState);
		ExpressionContext _prevctx = _localctx;
		int _startState = 104;
		enterRecursionRule(_localctx, 104, RULE_expression, _p);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(654);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,72,_ctx) ) {
			case 1:
				{
				setState(637);
				match(T__50);
				setState(638);
				typeName(0);
				}
				break;
			case 2:
				{
				setState(639);
				match(T__18);
				setState(640);
				expression(0);
				setState(641);
				match(T__19);
				}
				break;
			case 3:
				{
				setState(643);
				_la = _input.LA(1);
				if ( !(_la==T__48 || _la==T__49) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(644);
				expression(19);
				}
				break;
			case 4:
				{
				setState(645);
				_la = _input.LA(1);
				if ( !(_la==T__51 || _la==T__52) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(646);
				expression(18);
				}
				break;
			case 5:
				{
				setState(647);
				_la = _input.LA(1);
				if ( !(_la==T__53 || _la==T__54) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(648);
				expression(17);
				}
				break;
			case 6:
				{
				setState(649);
				match(T__55);
				setState(650);
				expression(16);
				}
				break;
			case 7:
				{
				setState(651);
				match(T__56);
				setState(652);
				expression(15);
				}
				break;
			case 8:
				{
				setState(653);
				primaryExpression();
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(715);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,74,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(713);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,73,_ctx) ) {
					case 1:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(656);
						if (!(precpred(_ctx, 14))) throw new FailedPredicateException(this, "precpred(_ctx, 14)");
						setState(657);
						match(T__57);
						setState(658);
						expression(15);
						}
						break;
					case 2:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(659);
						if (!(precpred(_ctx, 13))) throw new FailedPredicateException(this, "precpred(_ctx, 13)");
						setState(660);
						_la = _input.LA(1);
						if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__9) | (1L << T__58) | (1L << T__59))) != 0)) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(661);
						expression(14);
						}
						break;
					case 3:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(662);
						if (!(precpred(_ctx, 12))) throw new FailedPredicateException(this, "precpred(_ctx, 12)");
						setState(663);
						_la = _input.LA(1);
						if ( !(_la==T__51 || _la==T__52) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(664);
						expression(13);
						}
						break;
					case 4:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(665);
						if (!(precpred(_ctx, 11))) throw new FailedPredicateException(this, "precpred(_ctx, 11)");
						setState(666);
						_la = _input.LA(1);
						if ( !(_la==T__60 || _la==T__61) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(667);
						expression(12);
						}
						break;
					case 5:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(668);
						if (!(precpred(_ctx, 10))) throw new FailedPredicateException(this, "precpred(_ctx, 10)");
						setState(669);
						match(T__62);
						setState(670);
						expression(11);
						}
						break;
					case 6:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(671);
						if (!(precpred(_ctx, 9))) throw new FailedPredicateException(this, "precpred(_ctx, 9)");
						setState(672);
						match(T__2);
						setState(673);
						expression(10);
						}
						break;
					case 7:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(674);
						if (!(precpred(_ctx, 8))) throw new FailedPredicateException(this, "precpred(_ctx, 8)");
						setState(675);
						match(T__63);
						setState(676);
						expression(9);
						}
						break;
					case 8:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(677);
						if (!(precpred(_ctx, 7))) throw new FailedPredicateException(this, "precpred(_ctx, 7)");
						setState(678);
						_la = _input.LA(1);
						if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__3) | (1L << T__4) | (1L << T__5) | (1L << T__6))) != 0)) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(679);
						expression(8);
						}
						break;
					case 9:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(680);
						if (!(precpred(_ctx, 6))) throw new FailedPredicateException(this, "precpred(_ctx, 6)");
						setState(681);
						_la = _input.LA(1);
						if ( !(_la==T__64 || _la==T__65) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(682);
						expression(7);
						}
						break;
					case 10:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(683);
						if (!(precpred(_ctx, 5))) throw new FailedPredicateException(this, "precpred(_ctx, 5)");
						setState(684);
						match(T__66);
						setState(685);
						expression(6);
						}
						break;
					case 11:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(686);
						if (!(precpred(_ctx, 4))) throw new FailedPredicateException(this, "precpred(_ctx, 4)");
						setState(687);
						match(T__67);
						setState(688);
						expression(5);
						}
						break;
					case 12:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(689);
						if (!(precpred(_ctx, 3))) throw new FailedPredicateException(this, "precpred(_ctx, 3)");
						setState(690);
						match(T__68);
						setState(691);
						expression(0);
						setState(692);
						match(T__69);
						setState(693);
						expression(4);
						}
						break;
					case 13:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(695);
						if (!(precpred(_ctx, 2))) throw new FailedPredicateException(this, "precpred(_ctx, 2)");
						setState(696);
						_la = _input.LA(1);
						if ( !(((((_la - 21)) & ~0x3f) == 0 && ((1L << (_la - 21)) & ((1L << (T__20 - 21)) | (1L << (T__70 - 21)) | (1L << (T__71 - 21)) | (1L << (T__72 - 21)) | (1L << (T__73 - 21)) | (1L << (T__74 - 21)) | (1L << (T__75 - 21)) | (1L << (T__76 - 21)) | (1L << (T__77 - 21)) | (1L << (T__78 - 21)) | (1L << (T__79 - 21)))) != 0)) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(697);
						expression(3);
						}
						break;
					case 14:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(698);
						if (!(precpred(_ctx, 25))) throw new FailedPredicateException(this, "precpred(_ctx, 25)");
						setState(699);
						_la = _input.LA(1);
						if ( !(_la==T__48 || _la==T__49) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						}
						break;
					case 15:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(700);
						if (!(precpred(_ctx, 23))) throw new FailedPredicateException(this, "precpred(_ctx, 23)");
						setState(701);
						match(T__29);
						setState(702);
						expression(0);
						setState(703);
						match(T__30);
						}
						break;
					case 16:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(705);
						if (!(precpred(_ctx, 22))) throw new FailedPredicateException(this, "precpred(_ctx, 22)");
						setState(706);
						match(T__18);
						setState(707);
						functionCallArguments();
						setState(708);
						match(T__19);
						}
						break;
					case 17:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(710);
						if (!(precpred(_ctx, 21))) throw new FailedPredicateException(this, "precpred(_ctx, 21)");
						setState(711);
						match(T__31);
						setState(712);
						identifier();
						}
						break;
					}
					} 
				}
				setState(717);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,74,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public static class PrimaryExpressionContext extends ParserRuleContext {
		public TerminalNode BooleanLiteral() { return getToken(SolidityParser.BooleanLiteral, 0); }
		public NumberLiteralContext numberLiteral() {
			return getRuleContext(NumberLiteralContext.class,0);
		}
		public TerminalNode HexLiteral() { return getToken(SolidityParser.HexLiteral, 0); }
		public TerminalNode StringLiteral() { return getToken(SolidityParser.StringLiteral, 0); }
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public TupleExpressionContext tupleExpression() {
			return getRuleContext(TupleExpressionContext.class,0);
		}
		public ElementaryTypeNameExpressionContext elementaryTypeNameExpression() {
			return getRuleContext(ElementaryTypeNameExpressionContext.class,0);
		}
		public PrimaryExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_primaryExpression; }
	}

	public final PrimaryExpressionContext primaryExpression() throws RecognitionException {
		PrimaryExpressionContext _localctx = new PrimaryExpressionContext(_ctx, getState());
		enterRule(_localctx, 106, RULE_primaryExpression);
		try {
			setState(725);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case BooleanLiteral:
				enterOuterAlt(_localctx, 1);
				{
				setState(718);
				match(BooleanLiteral);
				}
				break;
			case DecimalNumber:
			case HexNumber:
				enterOuterAlt(_localctx, 2);
				{
				setState(719);
				numberLiteral();
				}
				break;
			case HexLiteral:
				enterOuterAlt(_localctx, 3);
				{
				setState(720);
				match(HexLiteral);
				}
				break;
			case StringLiteral:
				enterOuterAlt(_localctx, 4);
				{
				setState(721);
				match(StringLiteral);
				}
				break;
			case T__10:
			case Identifier:
				enterOuterAlt(_localctx, 5);
				{
				setState(722);
				identifier();
				}
				break;
			case T__18:
			case T__29:
				enterOuterAlt(_localctx, 6);
				{
				setState(723);
				tupleExpression();
				}
				break;
			case T__43:
			case T__44:
			case T__45:
			case T__46:
			case T__47:
			case Int:
			case Uint:
			case Byte:
			case Fixed:
			case Ufixed:
				enterOuterAlt(_localctx, 7);
				{
				setState(724);
				elementaryTypeNameExpression();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExpressionListContext extends ParserRuleContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public ExpressionListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expressionList; }
	}

	public final ExpressionListContext expressionList() throws RecognitionException {
		ExpressionListContext _localctx = new ExpressionListContext(_ctx, getState());
		enterRule(_localctx, 108, RULE_expressionList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(727);
			expression(0);
			setState(732);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__12) {
				{
				{
				setState(728);
				match(T__12);
				setState(729);
				expression(0);
				}
				}
				setState(734);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NameValueListContext extends ParserRuleContext {
		public List<NameValueContext> nameValue() {
			return getRuleContexts(NameValueContext.class);
		}
		public NameValueContext nameValue(int i) {
			return getRuleContext(NameValueContext.class,i);
		}
		public NameValueListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_nameValueList; }
	}

	public final NameValueListContext nameValueList() throws RecognitionException {
		NameValueListContext _localctx = new NameValueListContext(_ctx, getState());
		enterRule(_localctx, 110, RULE_nameValueList);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(735);
			nameValue();
			setState(740);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,77,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(736);
					match(T__12);
					setState(737);
					nameValue();
					}
					} 
				}
				setState(742);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,77,_ctx);
			}
			setState(744);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__12) {
				{
				setState(743);
				match(T__12);
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NameValueContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public NameValueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_nameValue; }
	}

	public final NameValueContext nameValue() throws RecognitionException {
		NameValueContext _localctx = new NameValueContext(_ctx, getState());
		enterRule(_localctx, 112, RULE_nameValue);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(746);
			identifier();
			setState(747);
			match(T__69);
			setState(748);
			expression(0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FunctionCallArgumentsContext extends ParserRuleContext {
		public NameValueListContext nameValueList() {
			return getRuleContext(NameValueListContext.class,0);
		}
		public ExpressionListContext expressionList() {
			return getRuleContext(ExpressionListContext.class,0);
		}
		public FunctionCallArgumentsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionCallArguments; }
	}

	public final FunctionCallArgumentsContext functionCallArguments() throws RecognitionException {
		FunctionCallArgumentsContext _localctx = new FunctionCallArgumentsContext(_ctx, getState());
		enterRule(_localctx, 114, RULE_functionCallArguments);
		int _la;
		try {
			setState(758);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__11:
				enterOuterAlt(_localctx, 1);
				{
				setState(750);
				match(T__11);
				setState(752);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==T__10 || _la==Identifier) {
					{
					setState(751);
					nameValueList();
					}
				}

				setState(754);
				match(T__13);
				}
				break;
			case T__10:
			case T__18:
			case T__19:
			case T__29:
			case T__43:
			case T__44:
			case T__45:
			case T__46:
			case T__47:
			case T__48:
			case T__49:
			case T__50:
			case T__51:
			case T__52:
			case T__53:
			case T__54:
			case T__55:
			case T__56:
			case Int:
			case Uint:
			case Byte:
			case Fixed:
			case Ufixed:
			case BooleanLiteral:
			case DecimalNumber:
			case HexNumber:
			case HexLiteral:
			case Identifier:
			case StringLiteral:
				enterOuterAlt(_localctx, 2);
				{
				setState(756);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__10) | (1L << T__18) | (1L << T__29) | (1L << T__43) | (1L << T__44) | (1L << T__45) | (1L << T__46) | (1L << T__47) | (1L << T__48) | (1L << T__49) | (1L << T__50) | (1L << T__51) | (1L << T__52) | (1L << T__53) | (1L << T__54) | (1L << T__55) | (1L << T__56))) != 0) || ((((_la - 88)) & ~0x3f) == 0 && ((1L << (_la - 88)) & ((1L << (Int - 88)) | (1L << (Uint - 88)) | (1L << (Byte - 88)) | (1L << (Fixed - 88)) | (1L << (Ufixed - 88)) | (1L << (BooleanLiteral - 88)) | (1L << (DecimalNumber - 88)) | (1L << (HexNumber - 88)) | (1L << (HexLiteral - 88)) | (1L << (Identifier - 88)) | (1L << (StringLiteral - 88)))) != 0)) {
					{
					setState(755);
					expressionList();
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AssemblyBlockContext extends ParserRuleContext {
		public List<AssemblyItemContext> assemblyItem() {
			return getRuleContexts(AssemblyItemContext.class);
		}
		public AssemblyItemContext assemblyItem(int i) {
			return getRuleContext(AssemblyItemContext.class,i);
		}
		public AssemblyBlockContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assemblyBlock; }
	}

	public final AssemblyBlockContext assemblyBlock() throws RecognitionException {
		AssemblyBlockContext _localctx = new AssemblyBlockContext(_ctx, getState());
		enterRule(_localctx, 116, RULE_assemblyBlock);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(760);
			match(T__11);
			setState(764);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__10) | (1L << T__11) | (1L << T__18) | (1L << T__22) | (1L << T__25) | (1L << T__36) | (1L << T__39) | (1L << T__41) | (1L << T__44) | (1L << T__47))) != 0) || ((((_la - 81)) & ~0x3f) == 0 && ((1L << (_la - 81)) & ((1L << (T__80 - 81)) | (1L << (T__82 - 81)) | (1L << (T__83 - 81)) | (1L << (DecimalNumber - 81)) | (1L << (HexNumber - 81)) | (1L << (HexLiteral - 81)) | (1L << (BreakKeyword - 81)) | (1L << (ContinueKeyword - 81)) | (1L << (Identifier - 81)) | (1L << (StringLiteral - 81)))) != 0)) {
				{
				{
				setState(761);
				assemblyItem();
				}
				}
				setState(766);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(767);
			match(T__13);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AssemblyItemContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public AssemblyBlockContext assemblyBlock() {
			return getRuleContext(AssemblyBlockContext.class,0);
		}
		public AssemblyExpressionContext assemblyExpression() {
			return getRuleContext(AssemblyExpressionContext.class,0);
		}
		public AssemblyLocalDefinitionContext assemblyLocalDefinition() {
			return getRuleContext(AssemblyLocalDefinitionContext.class,0);
		}
		public AssemblyAssignmentContext assemblyAssignment() {
			return getRuleContext(AssemblyAssignmentContext.class,0);
		}
		public AssemblyStackAssignmentContext assemblyStackAssignment() {
			return getRuleContext(AssemblyStackAssignmentContext.class,0);
		}
		public LabelDefinitionContext labelDefinition() {
			return getRuleContext(LabelDefinitionContext.class,0);
		}
		public AssemblySwitchContext assemblySwitch() {
			return getRuleContext(AssemblySwitchContext.class,0);
		}
		public AssemblyFunctionDefinitionContext assemblyFunctionDefinition() {
			return getRuleContext(AssemblyFunctionDefinitionContext.class,0);
		}
		public AssemblyForContext assemblyFor() {
			return getRuleContext(AssemblyForContext.class,0);
		}
		public AssemblyIfContext assemblyIf() {
			return getRuleContext(AssemblyIfContext.class,0);
		}
		public TerminalNode BreakKeyword() { return getToken(SolidityParser.BreakKeyword, 0); }
		public TerminalNode ContinueKeyword() { return getToken(SolidityParser.ContinueKeyword, 0); }
		public SubAssemblyContext subAssembly() {
			return getRuleContext(SubAssemblyContext.class,0);
		}
		public NumberLiteralContext numberLiteral() {
			return getRuleContext(NumberLiteralContext.class,0);
		}
		public TerminalNode StringLiteral() { return getToken(SolidityParser.StringLiteral, 0); }
		public TerminalNode HexLiteral() { return getToken(SolidityParser.HexLiteral, 0); }
		public AssemblyItemContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assemblyItem; }
	}

	public final AssemblyItemContext assemblyItem() throws RecognitionException {
		AssemblyItemContext _localctx = new AssemblyItemContext(_ctx, getState());
		enterRule(_localctx, 118, RULE_assemblyItem);
		try {
			setState(786);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,83,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(769);
				identifier();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(770);
				assemblyBlock();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(771);
				assemblyExpression();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(772);
				assemblyLocalDefinition();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(773);
				assemblyAssignment();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(774);
				assemblyStackAssignment();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(775);
				labelDefinition();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(776);
				assemblySwitch();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(777);
				assemblyFunctionDefinition();
				}
				break;
			case 10:
				enterOuterAlt(_localctx, 10);
				{
				setState(778);
				assemblyFor();
				}
				break;
			case 11:
				enterOuterAlt(_localctx, 11);
				{
				setState(779);
				assemblyIf();
				}
				break;
			case 12:
				enterOuterAlt(_localctx, 12);
				{
				setState(780);
				match(BreakKeyword);
				}
				break;
			case 13:
				enterOuterAlt(_localctx, 13);
				{
				setState(781);
				match(ContinueKeyword);
				}
				break;
			case 14:
				enterOuterAlt(_localctx, 14);
				{
				setState(782);
				subAssembly();
				}
				break;
			case 15:
				enterOuterAlt(_localctx, 15);
				{
				setState(783);
				numberLiteral();
				}
				break;
			case 16:
				enterOuterAlt(_localctx, 16);
				{
				setState(784);
				match(StringLiteral);
				}
				break;
			case 17:
				enterOuterAlt(_localctx, 17);
				{
				setState(785);
				match(HexLiteral);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AssemblyExpressionContext extends ParserRuleContext {
		public AssemblyCallContext assemblyCall() {
			return getRuleContext(AssemblyCallContext.class,0);
		}
		public AssemblyLiteralContext assemblyLiteral() {
			return getRuleContext(AssemblyLiteralContext.class,0);
		}
		public AssemblyExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assemblyExpression; }
	}

	public final AssemblyExpressionContext assemblyExpression() throws RecognitionException {
		AssemblyExpressionContext _localctx = new AssemblyExpressionContext(_ctx, getState());
		enterRule(_localctx, 120, RULE_assemblyExpression);
		try {
			setState(790);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__10:
			case T__41:
			case T__44:
			case T__47:
			case Identifier:
				enterOuterAlt(_localctx, 1);
				{
				setState(788);
				assemblyCall();
				}
				break;
			case DecimalNumber:
			case HexNumber:
			case HexLiteral:
			case StringLiteral:
				enterOuterAlt(_localctx, 2);
				{
				setState(789);
				assemblyLiteral();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AssemblyCallContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public List<AssemblyExpressionContext> assemblyExpression() {
			return getRuleContexts(AssemblyExpressionContext.class);
		}
		public AssemblyExpressionContext assemblyExpression(int i) {
			return getRuleContext(AssemblyExpressionContext.class,i);
		}
		public AssemblyCallContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assemblyCall; }
	}

	public final AssemblyCallContext assemblyCall() throws RecognitionException {
		AssemblyCallContext _localctx = new AssemblyCallContext(_ctx, getState());
		enterRule(_localctx, 122, RULE_assemblyCall);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(796);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__41:
				{
				setState(792);
				match(T__41);
				}
				break;
			case T__44:
				{
				setState(793);
				match(T__44);
				}
				break;
			case T__47:
				{
				setState(794);
				match(T__47);
				}
				break;
			case T__10:
			case Identifier:
				{
				setState(795);
				identifier();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(810);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,88,_ctx) ) {
			case 1:
				{
				setState(798);
				match(T__18);
				setState(800);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__10) | (1L << T__41) | (1L << T__44) | (1L << T__47))) != 0) || ((((_la - 95)) & ~0x3f) == 0 && ((1L << (_la - 95)) & ((1L << (DecimalNumber - 95)) | (1L << (HexNumber - 95)) | (1L << (HexLiteral - 95)) | (1L << (Identifier - 95)) | (1L << (StringLiteral - 95)))) != 0)) {
					{
					setState(799);
					assemblyExpression();
					}
				}

				setState(806);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==T__12) {
					{
					{
					setState(802);
					match(T__12);
					setState(803);
					assemblyExpression();
					}
					}
					setState(808);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(809);
				match(T__19);
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AssemblyLocalDefinitionContext extends ParserRuleContext {
		public AssemblyIdentifierOrListContext assemblyIdentifierOrList() {
			return getRuleContext(AssemblyIdentifierOrListContext.class,0);
		}
		public AssemblyExpressionContext assemblyExpression() {
			return getRuleContext(AssemblyExpressionContext.class,0);
		}
		public AssemblyLocalDefinitionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assemblyLocalDefinition; }
	}

	public final AssemblyLocalDefinitionContext assemblyLocalDefinition() throws RecognitionException {
		AssemblyLocalDefinitionContext _localctx = new AssemblyLocalDefinitionContext(_ctx, getState());
		enterRule(_localctx, 124, RULE_assemblyLocalDefinition);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(812);
			match(T__80);
			setState(813);
			assemblyIdentifierOrList();
			setState(816);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__81) {
				{
				setState(814);
				match(T__81);
				setState(815);
				assemblyExpression();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AssemblyAssignmentContext extends ParserRuleContext {
		public AssemblyIdentifierOrListContext assemblyIdentifierOrList() {
			return getRuleContext(AssemblyIdentifierOrListContext.class,0);
		}
		public AssemblyExpressionContext assemblyExpression() {
			return getRuleContext(AssemblyExpressionContext.class,0);
		}
		public AssemblyAssignmentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assemblyAssignment; }
	}

	public final AssemblyAssignmentContext assemblyAssignment() throws RecognitionException {
		AssemblyAssignmentContext _localctx = new AssemblyAssignmentContext(_ctx, getState());
		enterRule(_localctx, 126, RULE_assemblyAssignment);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(818);
			assemblyIdentifierOrList();
			setState(819);
			match(T__81);
			setState(820);
			assemblyExpression();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AssemblyIdentifierOrListContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public AssemblyIdentifierListContext assemblyIdentifierList() {
			return getRuleContext(AssemblyIdentifierListContext.class,0);
		}
		public AssemblyIdentifierOrListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assemblyIdentifierOrList; }
	}

	public final AssemblyIdentifierOrListContext assemblyIdentifierOrList() throws RecognitionException {
		AssemblyIdentifierOrListContext _localctx = new AssemblyIdentifierOrListContext(_ctx, getState());
		enterRule(_localctx, 128, RULE_assemblyIdentifierOrList);
		try {
			setState(827);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__10:
			case Identifier:
				enterOuterAlt(_localctx, 1);
				{
				setState(822);
				identifier();
				}
				break;
			case T__18:
				enterOuterAlt(_localctx, 2);
				{
				setState(823);
				match(T__18);
				setState(824);
				assemblyIdentifierList();
				setState(825);
				match(T__19);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AssemblyIdentifierListContext extends ParserRuleContext {
		public List<IdentifierContext> identifier() {
			return getRuleContexts(IdentifierContext.class);
		}
		public IdentifierContext identifier(int i) {
			return getRuleContext(IdentifierContext.class,i);
		}
		public AssemblyIdentifierListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assemblyIdentifierList; }
	}

	public final AssemblyIdentifierListContext assemblyIdentifierList() throws RecognitionException {
		AssemblyIdentifierListContext _localctx = new AssemblyIdentifierListContext(_ctx, getState());
		enterRule(_localctx, 130, RULE_assemblyIdentifierList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(829);
			identifier();
			setState(834);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__12) {
				{
				{
				setState(830);
				match(T__12);
				setState(831);
				identifier();
				}
				}
				setState(836);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AssemblyStackAssignmentContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public AssemblyStackAssignmentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assemblyStackAssignment; }
	}

	public final AssemblyStackAssignmentContext assemblyStackAssignment() throws RecognitionException {
		AssemblyStackAssignmentContext _localctx = new AssemblyStackAssignmentContext(_ctx, getState());
		enterRule(_localctx, 132, RULE_assemblyStackAssignment);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(837);
			match(T__82);
			setState(838);
			identifier();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class LabelDefinitionContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public LabelDefinitionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_labelDefinition; }
	}

	public final LabelDefinitionContext labelDefinition() throws RecognitionException {
		LabelDefinitionContext _localctx = new LabelDefinitionContext(_ctx, getState());
		enterRule(_localctx, 134, RULE_labelDefinition);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(840);
			identifier();
			setState(841);
			match(T__69);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AssemblySwitchContext extends ParserRuleContext {
		public AssemblyExpressionContext assemblyExpression() {
			return getRuleContext(AssemblyExpressionContext.class,0);
		}
		public List<AssemblyCaseContext> assemblyCase() {
			return getRuleContexts(AssemblyCaseContext.class);
		}
		public AssemblyCaseContext assemblyCase(int i) {
			return getRuleContext(AssemblyCaseContext.class,i);
		}
		public AssemblySwitchContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assemblySwitch; }
	}

	public final AssemblySwitchContext assemblySwitch() throws RecognitionException {
		AssemblySwitchContext _localctx = new AssemblySwitchContext(_ctx, getState());
		enterRule(_localctx, 136, RULE_assemblySwitch);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(843);
			match(T__83);
			setState(844);
			assemblyExpression();
			setState(848);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__84 || _la==T__85) {
				{
				{
				setState(845);
				assemblyCase();
				}
				}
				setState(850);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AssemblyCaseContext extends ParserRuleContext {
		public AssemblyLiteralContext assemblyLiteral() {
			return getRuleContext(AssemblyLiteralContext.class,0);
		}
		public AssemblyBlockContext assemblyBlock() {
			return getRuleContext(AssemblyBlockContext.class,0);
		}
		public AssemblyCaseContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assemblyCase; }
	}

	public final AssemblyCaseContext assemblyCase() throws RecognitionException {
		AssemblyCaseContext _localctx = new AssemblyCaseContext(_ctx, getState());
		enterRule(_localctx, 138, RULE_assemblyCase);
		try {
			setState(857);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__84:
				enterOuterAlt(_localctx, 1);
				{
				setState(851);
				match(T__84);
				setState(852);
				assemblyLiteral();
				setState(853);
				assemblyBlock();
				}
				break;
			case T__85:
				enterOuterAlt(_localctx, 2);
				{
				setState(855);
				match(T__85);
				setState(856);
				assemblyBlock();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AssemblyFunctionDefinitionContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public AssemblyBlockContext assemblyBlock() {
			return getRuleContext(AssemblyBlockContext.class,0);
		}
		public AssemblyIdentifierListContext assemblyIdentifierList() {
			return getRuleContext(AssemblyIdentifierListContext.class,0);
		}
		public AssemblyFunctionReturnsContext assemblyFunctionReturns() {
			return getRuleContext(AssemblyFunctionReturnsContext.class,0);
		}
		public AssemblyFunctionDefinitionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assemblyFunctionDefinition; }
	}

	public final AssemblyFunctionDefinitionContext assemblyFunctionDefinition() throws RecognitionException {
		AssemblyFunctionDefinitionContext _localctx = new AssemblyFunctionDefinitionContext(_ctx, getState());
		enterRule(_localctx, 140, RULE_assemblyFunctionDefinition);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(859);
			match(T__25);
			setState(860);
			identifier();
			setState(861);
			match(T__18);
			setState(863);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__10 || _la==Identifier) {
				{
				setState(862);
				assemblyIdentifierList();
				}
			}

			setState(865);
			match(T__19);
			setState(867);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__86) {
				{
				setState(866);
				assemblyFunctionReturns();
				}
			}

			setState(869);
			assemblyBlock();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AssemblyFunctionReturnsContext extends ParserRuleContext {
		public AssemblyIdentifierListContext assemblyIdentifierList() {
			return getRuleContext(AssemblyIdentifierListContext.class,0);
		}
		public AssemblyFunctionReturnsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assemblyFunctionReturns; }
	}

	public final AssemblyFunctionReturnsContext assemblyFunctionReturns() throws RecognitionException {
		AssemblyFunctionReturnsContext _localctx = new AssemblyFunctionReturnsContext(_ctx, getState());
		enterRule(_localctx, 142, RULE_assemblyFunctionReturns);
		try {
			enterOuterAlt(_localctx, 1);
			{
			{
			setState(871);
			match(T__86);
			setState(872);
			assemblyIdentifierList();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AssemblyForContext extends ParserRuleContext {
		public List<AssemblyExpressionContext> assemblyExpression() {
			return getRuleContexts(AssemblyExpressionContext.class);
		}
		public AssemblyExpressionContext assemblyExpression(int i) {
			return getRuleContext(AssemblyExpressionContext.class,i);
		}
		public List<AssemblyBlockContext> assemblyBlock() {
			return getRuleContexts(AssemblyBlockContext.class);
		}
		public AssemblyBlockContext assemblyBlock(int i) {
			return getRuleContext(AssemblyBlockContext.class,i);
		}
		public AssemblyForContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assemblyFor; }
	}

	public final AssemblyForContext assemblyFor() throws RecognitionException {
		AssemblyForContext _localctx = new AssemblyForContext(_ctx, getState());
		enterRule(_localctx, 144, RULE_assemblyFor);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(874);
			match(T__22);
			setState(877);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__11:
				{
				setState(875);
				assemblyBlock();
				}
				break;
			case T__10:
			case T__41:
			case T__44:
			case T__47:
			case DecimalNumber:
			case HexNumber:
			case HexLiteral:
			case Identifier:
			case StringLiteral:
				{
				setState(876);
				assemblyExpression();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(879);
			assemblyExpression();
			setState(882);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__11:
				{
				setState(880);
				assemblyBlock();
				}
				break;
			case T__10:
			case T__41:
			case T__44:
			case T__47:
			case DecimalNumber:
			case HexNumber:
			case HexLiteral:
			case Identifier:
			case StringLiteral:
				{
				setState(881);
				assemblyExpression();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(884);
			assemblyBlock();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AssemblyIfContext extends ParserRuleContext {
		public AssemblyExpressionContext assemblyExpression() {
			return getRuleContext(AssemblyExpressionContext.class,0);
		}
		public AssemblyBlockContext assemblyBlock() {
			return getRuleContext(AssemblyBlockContext.class,0);
		}
		public AssemblyIfContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assemblyIf; }
	}

	public final AssemblyIfContext assemblyIf() throws RecognitionException {
		AssemblyIfContext _localctx = new AssemblyIfContext(_ctx, getState());
		enterRule(_localctx, 146, RULE_assemblyIf);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(886);
			match(T__36);
			setState(887);
			assemblyExpression();
			setState(888);
			assemblyBlock();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AssemblyLiteralContext extends ParserRuleContext {
		public TerminalNode StringLiteral() { return getToken(SolidityParser.StringLiteral, 0); }
		public TerminalNode DecimalNumber() { return getToken(SolidityParser.DecimalNumber, 0); }
		public TerminalNode HexNumber() { return getToken(SolidityParser.HexNumber, 0); }
		public TerminalNode HexLiteral() { return getToken(SolidityParser.HexLiteral, 0); }
		public AssemblyLiteralContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assemblyLiteral; }
	}

	public final AssemblyLiteralContext assemblyLiteral() throws RecognitionException {
		AssemblyLiteralContext _localctx = new AssemblyLiteralContext(_ctx, getState());
		enterRule(_localctx, 148, RULE_assemblyLiteral);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(890);
			_la = _input.LA(1);
			if ( !(((((_la - 95)) & ~0x3f) == 0 && ((1L << (_la - 95)) & ((1L << (DecimalNumber - 95)) | (1L << (HexNumber - 95)) | (1L << (HexLiteral - 95)) | (1L << (StringLiteral - 95)))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SubAssemblyContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public AssemblyBlockContext assemblyBlock() {
			return getRuleContext(AssemblyBlockContext.class,0);
		}
		public SubAssemblyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_subAssembly; }
	}

	public final SubAssemblyContext subAssembly() throws RecognitionException {
		SubAssemblyContext _localctx = new SubAssemblyContext(_ctx, getState());
		enterRule(_localctx, 150, RULE_subAssembly);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(892);
			match(T__39);
			setState(893);
			identifier();
			setState(894);
			assemblyBlock();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TupleExpressionContext extends ParserRuleContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TupleExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tupleExpression; }
	}

	public final TupleExpressionContext tupleExpression() throws RecognitionException {
		TupleExpressionContext _localctx = new TupleExpressionContext(_ctx, getState());
		enterRule(_localctx, 152, RULE_tupleExpression);
		int _la;
		try {
			setState(922);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__18:
				enterOuterAlt(_localctx, 1);
				{
				setState(896);
				match(T__18);
				{
				setState(898);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__10) | (1L << T__18) | (1L << T__29) | (1L << T__43) | (1L << T__44) | (1L << T__45) | (1L << T__46) | (1L << T__47) | (1L << T__48) | (1L << T__49) | (1L << T__50) | (1L << T__51) | (1L << T__52) | (1L << T__53) | (1L << T__54) | (1L << T__55) | (1L << T__56))) != 0) || ((((_la - 88)) & ~0x3f) == 0 && ((1L << (_la - 88)) & ((1L << (Int - 88)) | (1L << (Uint - 88)) | (1L << (Byte - 88)) | (1L << (Fixed - 88)) | (1L << (Ufixed - 88)) | (1L << (BooleanLiteral - 88)) | (1L << (DecimalNumber - 88)) | (1L << (HexNumber - 88)) | (1L << (HexLiteral - 88)) | (1L << (Identifier - 88)) | (1L << (StringLiteral - 88)))) != 0)) {
					{
					setState(897);
					expression(0);
					}
				}

				setState(906);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==T__12) {
					{
					{
					setState(900);
					match(T__12);
					setState(902);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__10) | (1L << T__18) | (1L << T__29) | (1L << T__43) | (1L << T__44) | (1L << T__45) | (1L << T__46) | (1L << T__47) | (1L << T__48) | (1L << T__49) | (1L << T__50) | (1L << T__51) | (1L << T__52) | (1L << T__53) | (1L << T__54) | (1L << T__55) | (1L << T__56))) != 0) || ((((_la - 88)) & ~0x3f) == 0 && ((1L << (_la - 88)) & ((1L << (Int - 88)) | (1L << (Uint - 88)) | (1L << (Byte - 88)) | (1L << (Fixed - 88)) | (1L << (Ufixed - 88)) | (1L << (BooleanLiteral - 88)) | (1L << (DecimalNumber - 88)) | (1L << (HexNumber - 88)) | (1L << (HexLiteral - 88)) | (1L << (Identifier - 88)) | (1L << (StringLiteral - 88)))) != 0)) {
						{
						setState(901);
						expression(0);
						}
					}

					}
					}
					setState(908);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
				setState(909);
				match(T__19);
				}
				break;
			case T__29:
				enterOuterAlt(_localctx, 2);
				{
				setState(910);
				match(T__29);
				setState(919);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__10) | (1L << T__18) | (1L << T__29) | (1L << T__43) | (1L << T__44) | (1L << T__45) | (1L << T__46) | (1L << T__47) | (1L << T__48) | (1L << T__49) | (1L << T__50) | (1L << T__51) | (1L << T__52) | (1L << T__53) | (1L << T__54) | (1L << T__55) | (1L << T__56))) != 0) || ((((_la - 88)) & ~0x3f) == 0 && ((1L << (_la - 88)) & ((1L << (Int - 88)) | (1L << (Uint - 88)) | (1L << (Byte - 88)) | (1L << (Fixed - 88)) | (1L << (Ufixed - 88)) | (1L << (BooleanLiteral - 88)) | (1L << (DecimalNumber - 88)) | (1L << (HexNumber - 88)) | (1L << (HexLiteral - 88)) | (1L << (Identifier - 88)) | (1L << (StringLiteral - 88)))) != 0)) {
					{
					setState(911);
					expression(0);
					setState(916);
					_errHandler.sync(this);
					_la = _input.LA(1);
					while (_la==T__12) {
						{
						{
						setState(912);
						match(T__12);
						setState(913);
						expression(0);
						}
						}
						setState(918);
						_errHandler.sync(this);
						_la = _input.LA(1);
					}
					}
				}

				setState(921);
				match(T__30);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ElementaryTypeNameExpressionContext extends ParserRuleContext {
		public ElementaryTypeNameContext elementaryTypeName() {
			return getRuleContext(ElementaryTypeNameContext.class,0);
		}
		public ElementaryTypeNameExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_elementaryTypeNameExpression; }
	}

	public final ElementaryTypeNameExpressionContext elementaryTypeNameExpression() throws RecognitionException {
		ElementaryTypeNameExpressionContext _localctx = new ElementaryTypeNameExpressionContext(_ctx, getState());
		enterRule(_localctx, 154, RULE_elementaryTypeNameExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(924);
			elementaryTypeName();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NatspecContext extends ParserRuleContext {
		public TerminalNode NATSPEC_COMMENT() { return getToken(SolidityParser.NATSPEC_COMMENT, 0); }
		public TerminalNode NATSPEC_LINE_COMMENT() { return getToken(SolidityParser.NATSPEC_LINE_COMMENT, 0); }
		public NatspecContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_natspec; }
	}

	public final NatspecContext natspec() throws RecognitionException {
		NatspecContext _localctx = new NatspecContext(_ctx, getState());
		enterRule(_localctx, 156, RULE_natspec);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(926);
			_la = _input.LA(1);
			if ( !(_la==NATSPEC_COMMENT || _la==NATSPEC_LINE_COMMENT) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NumberLiteralContext extends ParserRuleContext {
		public TerminalNode DecimalNumber() { return getToken(SolidityParser.DecimalNumber, 0); }
		public TerminalNode HexNumber() { return getToken(SolidityParser.HexNumber, 0); }
		public TerminalNode NumberUnit() { return getToken(SolidityParser.NumberUnit, 0); }
		public NumberLiteralContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_numberLiteral; }
	}

	public final NumberLiteralContext numberLiteral() throws RecognitionException {
		NumberLiteralContext _localctx = new NumberLiteralContext(_ctx, getState());
		enterRule(_localctx, 158, RULE_numberLiteral);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(928);
			_la = _input.LA(1);
			if ( !(_la==DecimalNumber || _la==HexNumber) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			setState(930);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,104,_ctx) ) {
			case 1:
				{
				setState(929);
				match(NumberUnit);
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class IdentifierContext extends ParserRuleContext {
		public TerminalNode Identifier() { return getToken(SolidityParser.Identifier, 0); }
		public IdentifierContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_identifier; }
	}

	public final IdentifierContext identifier() throws RecognitionException {
		IdentifierContext _localctx = new IdentifierContext(_ctx, getState());
		enterRule(_localctx, 160, RULE_identifier);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(932);
			_la = _input.LA(1);
			if ( !(_la==T__10 || _la==Identifier) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public boolean sempred(RuleContext _localctx, int ruleIndex, int predIndex) {
		switch (ruleIndex) {
		case 30:
			return typeName_sempred((TypeNameContext)_localctx, predIndex);
		case 52:
			return expression_sempred((ExpressionContext)_localctx, predIndex);
		}
		return true;
	}
	private boolean typeName_sempred(TypeNameContext _localctx, int predIndex) {
		switch (predIndex) {
		case 0:
			return precpred(_ctx, 2);
		}
		return true;
	}
	private boolean expression_sempred(ExpressionContext _localctx, int predIndex) {
		switch (predIndex) {
		case 1:
			return precpred(_ctx, 14);
		case 2:
			return precpred(_ctx, 13);
		case 3:
			return precpred(_ctx, 12);
		case 4:
			return precpred(_ctx, 11);
		case 5:
			return precpred(_ctx, 10);
		case 6:
			return precpred(_ctx, 9);
		case 7:
			return precpred(_ctx, 8);
		case 8:
			return precpred(_ctx, 7);
		case 9:
			return precpred(_ctx, 6);
		case 10:
			return precpred(_ctx, 5);
		case 11:
			return precpred(_ctx, 4);
		case 12:
			return precpred(_ctx, 3);
		case 13:
			return precpred(_ctx, 2);
		case 14:
			return precpred(_ctx, 25);
		case 15:
			return precpred(_ctx, 23);
		case 16:
			return precpred(_ctx, 22);
		case 17:
			return precpred(_ctx, 21);
		}
		return true;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3x\u03a9\4\2\t\2\4"+
		"\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13\t"+
		"\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22\t\22"+
		"\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4\31\t\31"+
		"\4\32\t\32\4\33\t\33\4\34\t\34\4\35\t\35\4\36\t\36\4\37\t\37\4 \t \4!"+
		"\t!\4\"\t\"\4#\t#\4$\t$\4%\t%\4&\t&\4\'\t\'\4(\t(\4)\t)\4*\t*\4+\t+\4"+
		",\t,\4-\t-\4.\t.\4/\t/\4\60\t\60\4\61\t\61\4\62\t\62\4\63\t\63\4\64\t"+
		"\64\4\65\t\65\4\66\t\66\4\67\t\67\48\t8\49\t9\4:\t:\4;\t;\4<\t<\4=\t="+
		"\4>\t>\4?\t?\4@\t@\4A\tA\4B\tB\4C\tC\4D\tD\4E\tE\4F\tF\4G\tG\4H\tH\4I"+
		"\tI\4J\tJ\4K\tK\4L\tL\4M\tM\4N\tN\4O\tO\4P\tP\4Q\tQ\4R\tR\3\2\3\2\3\2"+
		"\7\2\u00a8\n\2\f\2\16\2\u00ab\13\2\3\2\3\2\3\3\3\3\3\3\3\3\3\3\3\4\3\4"+
		"\3\5\3\5\5\5\u00b8\n\5\3\6\3\6\5\6\u00bc\n\6\3\7\3\7\3\b\5\b\u00c1\n\b"+
		"\3\b\3\b\3\t\3\t\3\t\5\t\u00c8\n\t\3\n\3\n\3\n\3\n\5\n\u00ce\n\n\3\n\3"+
		"\n\3\n\3\n\5\n\u00d4\n\n\3\n\3\n\5\n\u00d8\n\n\3\n\3\n\3\n\3\n\3\n\3\n"+
		"\3\n\3\n\7\n\u00e2\n\n\f\n\16\n\u00e5\13\n\3\n\3\n\3\n\3\n\3\n\5\n\u00ec"+
		"\n\n\3\13\5\13\u00ef\n\13\3\13\3\13\3\13\3\13\3\13\3\13\7\13\u00f7\n\13"+
		"\f\13\16\13\u00fa\13\13\5\13\u00fc\n\13\3\13\3\13\7\13\u0100\n\13\f\13"+
		"\16\13\u0103\13\13\3\13\3\13\3\f\3\f\3\f\3\f\3\f\7\f\u010c\n\f\f\f\16"+
		"\f\u010f\13\f\3\f\3\f\5\f\u0113\n\f\3\r\3\r\3\r\3\r\3\r\3\r\3\r\5\r\u011c"+
		"\n\r\3\16\5\16\u011f\n\16\3\16\3\16\7\16\u0123\n\16\f\16\16\16\u0126\13"+
		"\16\3\16\3\16\3\16\5\16\u012b\n\16\3\16\3\16\3\17\3\17\3\17\3\17\3\17"+
		"\5\17\u0134\n\17\3\17\3\17\3\20\3\20\3\20\3\20\3\20\3\20\3\20\3\20\7\20"+
		"\u0140\n\20\f\20\16\20\u0143\13\20\5\20\u0145\n\20\3\20\3\20\3\21\5\21"+
		"\u014a\n\21\3\21\3\21\3\21\5\21\u014f\n\21\3\21\3\21\3\22\3\22\3\22\5"+
		"\22\u0156\n\22\3\22\5\22\u0159\n\22\3\23\5\23\u015c\n\23\3\23\3\23\5\23"+
		"\u0160\n\23\3\23\3\23\3\23\5\23\u0165\n\23\3\23\3\23\5\23\u0169\n\23\3"+
		"\24\3\24\3\24\3\25\3\25\3\25\3\25\3\25\3\25\7\25\u0174\n\25\f\25\16\25"+
		"\u0177\13\25\3\26\5\26\u017a\n\26\3\26\3\26\3\26\3\26\5\26\u0180\n\26"+
		"\3\26\3\26\3\27\3\27\3\30\5\30\u0187\n\30\3\30\3\30\3\30\3\30\5\30\u018d"+
		"\n\30\3\30\3\30\7\30\u0191\n\30\f\30\16\30\u0194\13\30\3\30\3\30\3\31"+
		"\3\31\3\31\3\31\7\31\u019c\n\31\f\31\16\31\u019f\13\31\5\31\u01a1\n\31"+
		"\3\31\3\31\3\32\3\32\5\32\u01a7\n\32\3\32\5\32\u01aa\n\32\3\33\3\33\3"+
		"\33\3\33\7\33\u01b0\n\33\f\33\16\33\u01b3\13\33\5\33\u01b5\n\33\3\33\3"+
		"\33\3\34\3\34\5\34\u01bb\n\34\3\34\5\34\u01be\n\34\3\35\3\35\3\35\3\35"+
		"\7\35\u01c4\n\35\f\35\16\35\u01c7\13\35\5\35\u01c9\n\35\3\35\3\35\3\36"+
		"\3\36\5\36\u01cf\n\36\3\37\3\37\5\37\u01d3\n\37\3\37\3\37\3 \3 \3 \3 "+
		"\3 \5 \u01dc\n \3 \3 \3 \5 \u01e1\n \3 \7 \u01e4\n \f \16 \u01e7\13 \3"+
		"!\3!\3!\7!\u01ec\n!\f!\16!\u01ef\13!\3\"\3\"\3\"\3\"\3\"\3\"\3\"\3#\3"+
		"#\3#\3#\3#\7#\u01fd\n#\f#\16#\u0200\13#\3#\3#\5#\u0204\n#\3$\3$\3%\3%"+
		"\3&\3&\7&\u020c\n&\f&\16&\u020f\13&\3&\3&\3\'\3\'\3\'\3\'\3\'\3\'\3\'"+
		"\3\'\3\'\3\'\3\'\5\'\u021e\n\'\3(\3(\3(\3)\3)\3)\3)\3)\3)\3)\5)\u022a"+
		"\n)\3*\3*\3*\3*\3*\3*\3+\3+\5+\u0234\n+\3,\3,\3,\3,\5,\u023a\n,\3,\5,"+
		"\u023d\n,\3,\3,\5,\u0241\n,\3,\3,\3,\3-\3-\5-\u0248\n-\3-\3-\3.\3.\3."+
		"\3.\3.\3.\3.\3.\3/\3/\3/\3\60\3\60\3\60\3\61\3\61\5\61\u025c\n\61\3\61"+
		"\3\61\3\62\3\62\3\62\3\63\3\63\3\63\5\63\u0266\n\63\3\63\3\63\5\63\u026a"+
		"\n\63\3\63\3\63\3\64\3\64\5\64\u0270\n\64\3\64\7\64\u0273\n\64\f\64\16"+
		"\64\u0276\13\64\3\64\5\64\u0279\n\64\3\64\3\64\3\65\3\65\3\66\3\66\3\66"+
		"\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66"+
		"\3\66\5\66\u0291\n\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66"+
		"\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66"+
		"\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66"+
		"\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66"+
		"\3\66\3\66\3\66\3\66\3\66\7\66\u02cc\n\66\f\66\16\66\u02cf\13\66\3\67"+
		"\3\67\3\67\3\67\3\67\3\67\3\67\5\67\u02d8\n\67\38\38\38\78\u02dd\n8\f"+
		"8\168\u02e0\138\39\39\39\79\u02e5\n9\f9\169\u02e8\139\39\59\u02eb\n9\3"+
		":\3:\3:\3:\3;\3;\5;\u02f3\n;\3;\3;\5;\u02f7\n;\5;\u02f9\n;\3<\3<\7<\u02fd"+
		"\n<\f<\16<\u0300\13<\3<\3<\3=\3=\3=\3=\3=\3=\3=\3=\3=\3=\3=\3=\3=\3=\3"+
		"=\3=\3=\5=\u0315\n=\3>\3>\5>\u0319\n>\3?\3?\3?\3?\5?\u031f\n?\3?\3?\5"+
		"?\u0323\n?\3?\3?\7?\u0327\n?\f?\16?\u032a\13?\3?\5?\u032d\n?\3@\3@\3@"+
		"\3@\5@\u0333\n@\3A\3A\3A\3A\3B\3B\3B\3B\3B\5B\u033e\nB\3C\3C\3C\7C\u0343"+
		"\nC\fC\16C\u0346\13C\3D\3D\3D\3E\3E\3E\3F\3F\3F\7F\u0351\nF\fF\16F\u0354"+
		"\13F\3G\3G\3G\3G\3G\3G\5G\u035c\nG\3H\3H\3H\3H\5H\u0362\nH\3H\3H\5H\u0366"+
		"\nH\3H\3H\3I\3I\3I\3J\3J\3J\5J\u0370\nJ\3J\3J\3J\5J\u0375\nJ\3J\3J\3K"+
		"\3K\3K\3K\3L\3L\3M\3M\3M\3M\3N\3N\5N\u0385\nN\3N\3N\5N\u0389\nN\7N\u038b"+
		"\nN\fN\16N\u038e\13N\3N\3N\3N\3N\3N\7N\u0395\nN\fN\16N\u0398\13N\5N\u039a"+
		"\nN\3N\5N\u039d\nN\3O\3O\3P\3P\3Q\3Q\5Q\u03a5\nQ\3R\3R\3R\2\4>jS\2\4\6"+
		"\b\n\f\16\20\22\24\26\30\32\34\36 \"$&(*,.\60\62\64\668:<>@BDFHJLNPRT"+
		"VXZ\\^`bdfhjlnprtvxz|~\u0080\u0082\u0084\u0086\u0088\u008a\u008c\u008e"+
		"\u0090\u0092\u0094\u0096\u0098\u009a\u009c\u009e\u00a0\u00a2\2\24\3\2"+
		"\5\t\3\2\21\23\5\2hhllno\3\2%&\5\2hhmmpq\4\2.\62Z^\3\2\63\64\3\2\66\67"+
		"\3\289\4\2\f\f=>\3\2?@\3\2\6\t\3\2CD\4\2\27\27IR\5\2abddss\4\2uuww\3\2"+
		"ab\4\2\r\rrr\2\u0402\2\u00a9\3\2\2\2\4\u00ae\3\2\2\2\6\u00b3\3\2\2\2\b"+
		"\u00b7\3\2\2\2\n\u00b9\3\2\2\2\f\u00bd\3\2\2\2\16\u00c0\3\2\2\2\20\u00c4"+
		"\3\2\2\2\22\u00eb\3\2\2\2\24\u00ee\3\2\2\2\26\u0106\3\2\2\2\30\u011b\3"+
		"\2\2\2\32\u011e\3\2\2\2\34\u012e\3\2\2\2\36\u0137\3\2\2\2 \u0149\3\2\2"+
		"\2\"\u0152\3\2\2\2$\u015b\3\2\2\2&\u016a\3\2\2\2(\u0175\3\2\2\2*\u0179"+
		"\3\2\2\2,\u0183\3\2\2\2.\u0186\3\2\2\2\60\u0197\3\2\2\2\62\u01a4\3\2\2"+
		"\2\64\u01ab\3\2\2\2\66\u01b8\3\2\2\28\u01bf\3\2\2\2:\u01cc\3\2\2\2<\u01d0"+
		"\3\2\2\2>\u01db\3\2\2\2@\u01e8\3\2\2\2B\u01f0\3\2\2\2D\u01f7\3\2\2\2F"+
		"\u0205\3\2\2\2H\u0207\3\2\2\2J\u0209\3\2\2\2L\u021d\3\2\2\2N\u021f\3\2"+
		"\2\2P\u0222\3\2\2\2R\u022b\3\2\2\2T\u0233\3\2\2\2V\u0235\3\2\2\2X\u0245"+
		"\3\2\2\2Z\u024b\3\2\2\2\\\u0253\3\2\2\2^\u0256\3\2\2\2`\u0259\3\2\2\2"+
		"b\u025f\3\2\2\2d\u0265\3\2\2\2f\u026d\3\2\2\2h\u027c\3\2\2\2j\u0290\3"+
		"\2\2\2l\u02d7\3\2\2\2n\u02d9\3\2\2\2p\u02e1\3\2\2\2r\u02ec\3\2\2\2t\u02f8"+
		"\3\2\2\2v\u02fa\3\2\2\2x\u0314\3\2\2\2z\u0318\3\2\2\2|\u031e\3\2\2\2~"+
		"\u032e\3\2\2\2\u0080\u0334\3\2\2\2\u0082\u033d\3\2\2\2\u0084\u033f\3\2"+
		"\2\2\u0086\u0347\3\2\2\2\u0088\u034a\3\2\2\2\u008a\u034d\3\2\2\2\u008c"+
		"\u035b\3\2\2\2\u008e\u035d\3\2\2\2\u0090\u0369\3\2\2\2\u0092\u036c\3\2"+
		"\2\2\u0094\u0378\3\2\2\2\u0096\u037c\3\2\2\2\u0098\u037e\3\2\2\2\u009a"+
		"\u039c\3\2\2\2\u009c\u039e\3\2\2\2\u009e\u03a0\3\2\2\2\u00a0\u03a2\3\2"+
		"\2\2\u00a2\u03a6\3\2\2\2\u00a4\u00a8\5\4\3\2\u00a5\u00a8\5\22\n\2\u00a6"+
		"\u00a8\5\24\13\2\u00a7\u00a4\3\2\2\2\u00a7\u00a5\3\2\2\2\u00a7\u00a6\3"+
		"\2\2\2\u00a8\u00ab\3\2\2\2\u00a9\u00a7\3\2\2\2\u00a9\u00aa\3\2\2\2\u00aa"+
		"\u00ac\3\2\2\2\u00ab\u00a9\3\2\2\2\u00ac\u00ad\7\2\2\3\u00ad\3\3\2\2\2"+
		"\u00ae\u00af\7\3\2\2\u00af\u00b0\5\6\4\2\u00b0\u00b1\5\b\5\2\u00b1\u00b2"+
		"\7\4\2\2\u00b2\5\3\2\2\2\u00b3\u00b4\5\u00a2R\2\u00b4\7\3\2\2\2\u00b5"+
		"\u00b8\5\n\6\2\u00b6\u00b8\5j\66\2\u00b7\u00b5\3\2\2\2\u00b7\u00b6\3\2"+
		"\2\2\u00b8\t\3\2\2\2\u00b9\u00bb\5\16\b\2\u00ba\u00bc\5\16\b\2\u00bb\u00ba"+
		"\3\2\2\2\u00bb\u00bc\3\2\2\2\u00bc\13\3\2\2\2\u00bd\u00be\t\2\2\2\u00be"+
		"\r\3\2\2\2\u00bf\u00c1\5\f\7\2\u00c0\u00bf\3\2\2\2\u00c0\u00c1\3\2\2\2"+
		"\u00c1\u00c2\3\2\2\2\u00c2\u00c3\7_\2\2\u00c3\17\3\2\2\2\u00c4\u00c7\5"+
		"\u00a2R\2\u00c5\u00c6\7\n\2\2\u00c6\u00c8\5\u00a2R\2\u00c7\u00c5\3\2\2"+
		"\2\u00c7\u00c8\3\2\2\2\u00c8\21\3\2\2\2\u00c9\u00ca\7\13\2\2\u00ca\u00cd"+
		"\7s\2\2\u00cb\u00cc\7\n\2\2\u00cc\u00ce\5\u00a2R\2\u00cd\u00cb\3\2\2\2"+
		"\u00cd\u00ce\3\2\2\2\u00ce\u00cf\3\2\2\2\u00cf\u00ec\7\4\2\2\u00d0\u00d3"+
		"\7\13\2\2\u00d1\u00d4\7\f\2\2\u00d2\u00d4\5\u00a2R\2\u00d3\u00d1\3\2\2"+
		"\2\u00d3\u00d2\3\2\2\2\u00d4\u00d7\3\2\2\2\u00d5\u00d6\7\n\2\2\u00d6\u00d8"+
		"\5\u00a2R\2\u00d7\u00d5\3\2\2\2\u00d7\u00d8\3\2\2\2\u00d8\u00d9\3\2\2"+
		"\2\u00d9\u00da\7\r\2\2\u00da\u00db\7s\2\2\u00db\u00ec\7\4\2\2\u00dc\u00dd"+
		"\7\13\2\2\u00dd\u00de\7\16\2\2\u00de\u00e3\5\20\t\2\u00df\u00e0\7\17\2"+
		"\2\u00e0\u00e2\5\20\t\2\u00e1\u00df\3\2\2\2\u00e2\u00e5\3\2\2\2\u00e3"+
		"\u00e1\3\2\2\2\u00e3\u00e4\3\2\2\2\u00e4\u00e6\3\2\2\2\u00e5\u00e3\3\2"+
		"\2\2\u00e6\u00e7\7\20\2\2\u00e7\u00e8\7\r\2\2\u00e8\u00e9\7s\2\2\u00e9"+
		"\u00ea\7\4\2\2\u00ea\u00ec\3\2\2\2\u00eb\u00c9\3\2\2\2\u00eb\u00d0\3\2"+
		"\2\2\u00eb\u00dc\3\2\2\2\u00ec\23\3\2\2\2\u00ed\u00ef\5\u009eP\2\u00ee"+
		"\u00ed\3\2\2\2\u00ee\u00ef\3\2\2\2\u00ef\u00f0\3\2\2\2\u00f0\u00f1\t\3"+
		"\2\2\u00f1\u00fb\5\u00a2R\2\u00f2\u00f3\7\24\2\2\u00f3\u00f8\5\26\f\2"+
		"\u00f4\u00f5\7\17\2\2\u00f5\u00f7\5\26\f\2\u00f6\u00f4\3\2\2\2\u00f7\u00fa"+
		"\3\2\2\2\u00f8\u00f6\3\2\2\2\u00f8\u00f9\3\2\2\2\u00f9\u00fc\3\2\2\2\u00fa"+
		"\u00f8\3\2\2\2\u00fb\u00f2\3\2\2\2\u00fb\u00fc\3\2\2\2\u00fc\u00fd\3\2"+
		"\2\2\u00fd\u0101\7\16\2\2\u00fe\u0100\5\30\r\2\u00ff\u00fe\3\2\2\2\u0100"+
		"\u0103\3\2\2\2\u0101\u00ff\3\2\2\2\u0101\u0102\3\2\2\2\u0102\u0104\3\2"+
		"\2\2\u0103\u0101\3\2\2\2\u0104\u0105\7\20\2\2\u0105\25\3\2\2\2\u0106\u0112"+
		"\5@!\2\u0107\u0108\7\25\2\2\u0108\u010d\5j\66\2\u0109\u010a\7\17\2\2\u010a"+
		"\u010c\5j\66\2\u010b\u0109\3\2\2\2\u010c\u010f\3\2\2\2\u010d\u010b\3\2"+
		"\2\2\u010d\u010e\3\2\2\2\u010e\u0110\3\2\2\2\u010f\u010d\3\2\2\2\u0110"+
		"\u0111\7\26\2\2\u0111\u0113\3\2\2\2\u0112\u0107\3\2\2\2\u0112\u0113\3"+
		"\2\2\2\u0113\27\3\2\2\2\u0114\u011c\5\32\16\2\u0115\u011c\5\34\17\2\u0116"+
		"\u011c\5\36\20\2\u0117\u011c\5 \21\2\u0118\u011c\5$\23\2\u0119\u011c\5"+
		"*\26\2\u011a\u011c\5.\30\2\u011b\u0114\3\2\2\2\u011b\u0115\3\2\2\2\u011b"+
		"\u0116\3\2\2\2\u011b\u0117\3\2\2\2\u011b\u0118\3\2\2\2\u011b\u0119\3\2"+
		"\2\2\u011b\u011a\3\2\2\2\u011c\31\3\2\2\2\u011d\u011f\5\u009eP\2\u011e"+
		"\u011d\3\2\2\2\u011e\u011f\3\2\2\2\u011f\u0120\3\2\2\2\u0120\u0124\5>"+
		" \2\u0121\u0123\t\4\2\2\u0122\u0121\3\2\2\2\u0123\u0126\3\2\2\2\u0124"+
		"\u0122\3\2\2\2\u0124\u0125\3\2\2\2\u0125\u0127\3\2\2\2\u0126\u0124\3\2"+
		"\2\2\u0127\u012a\5\u00a2R\2\u0128\u0129\7\27\2\2\u0129\u012b\5j\66\2\u012a"+
		"\u0128\3\2\2\2\u012a\u012b\3\2\2\2\u012b\u012c\3\2\2\2\u012c\u012d\7\4"+
		"\2\2\u012d\33\3\2\2\2\u012e\u012f\7\30\2\2\u012f\u0130\5\u00a2R\2\u0130"+
		"\u0133\7\31\2\2\u0131\u0134\7\f\2\2\u0132\u0134\5> \2\u0133\u0131\3\2"+
		"\2\2\u0133\u0132\3\2\2\2\u0134\u0135\3\2\2\2\u0135\u0136\7\4\2\2\u0136"+
		"\35\3\2\2\2\u0137\u0138\7\32\2\2\u0138\u0139\5\u00a2R\2\u0139\u0144\7"+
		"\16\2\2\u013a\u013b\5<\37\2\u013b\u0141\7\4\2\2\u013c\u013d\5<\37\2\u013d"+
		"\u013e\7\4\2\2\u013e\u0140\3\2\2\2\u013f\u013c\3\2\2\2\u0140\u0143\3\2"+
		"\2\2\u0141\u013f\3\2\2\2\u0141\u0142\3\2\2\2\u0142\u0145\3\2\2\2\u0143"+
		"\u0141\3\2\2\2\u0144\u013a\3\2\2\2\u0144\u0145\3\2\2\2\u0145\u0146\3\2"+
		"\2\2\u0146\u0147\7\20\2\2\u0147\37\3\2\2\2\u0148\u014a\5\u009eP\2\u0149"+
		"\u0148\3\2\2\2\u0149\u014a\3\2\2\2\u014a\u014b\3\2\2\2\u014b\u014c\7\33"+
		"\2\2\u014c\u014e\5\u00a2R\2\u014d\u014f\5\60\31\2\u014e\u014d\3\2\2\2"+
		"\u014e\u014f\3\2\2\2\u014f\u0150\3\2\2\2\u0150\u0151\5J&\2\u0151!\3\2"+
		"\2\2\u0152\u0158\5\u00a2R\2\u0153\u0155\7\25\2\2\u0154\u0156\5n8\2\u0155"+
		"\u0154\3\2\2\2\u0155\u0156\3\2\2\2\u0156\u0157\3\2\2\2\u0157\u0159\7\26"+
		"\2\2\u0158\u0153\3\2\2\2\u0158\u0159\3\2\2\2\u0159#\3\2\2\2\u015a\u015c"+
		"\5\u009eP\2\u015b\u015a\3\2\2\2\u015b\u015c\3\2\2\2\u015c\u015d\3\2\2"+
		"\2\u015d\u015f\7\34\2\2\u015e\u0160\5\u00a2R\2\u015f\u015e\3\2\2\2\u015f"+
		"\u0160\3\2\2\2\u0160\u0161\3\2\2\2\u0161\u0162\5\60\31\2\u0162\u0164\5"+
		"(\25\2\u0163\u0165\5&\24\2\u0164\u0163\3\2\2\2\u0164\u0165\3\2\2\2\u0165"+
		"\u0168\3\2\2\2\u0166\u0169\7\4\2\2\u0167\u0169\5J&\2\u0168\u0166\3\2\2"+
		"\2\u0168\u0167\3\2\2\2\u0169%\3\2\2\2\u016a\u016b\7\35\2\2\u016b\u016c"+
		"\5\60\31\2\u016c\'\3\2\2\2\u016d\u0174\5\"\22\2\u016e\u0174\5H%\2\u016f"+
		"\u0174\7j\2\2\u0170\u0174\7o\2\2\u0171\u0174\7l\2\2\u0172\u0174\7n\2\2"+
		"\u0173\u016d\3\2\2\2\u0173\u016e\3\2\2\2\u0173\u016f\3\2\2\2\u0173\u0170"+
		"\3\2\2\2\u0173\u0171\3\2\2\2\u0173\u0172\3\2\2\2\u0174\u0177\3\2\2\2\u0175"+
		"\u0173\3\2\2\2\u0175\u0176\3\2\2\2\u0176)\3\2\2\2\u0177\u0175\3\2\2\2"+
		"\u0178\u017a\5\u009eP\2\u0179\u0178\3\2\2\2\u0179\u017a\3\2\2\2\u017a"+
		"\u017b\3\2\2\2\u017b\u017c\7\36\2\2\u017c\u017d\5\u00a2R\2\u017d\u017f"+
		"\5\64\33\2\u017e\u0180\7f\2\2\u017f\u017e\3\2\2\2\u017f\u0180\3\2\2\2"+
		"\u0180\u0181\3\2\2\2\u0181\u0182\7\4\2\2\u0182+\3\2\2\2\u0183\u0184\5"+
		"\u00a2R\2\u0184-\3\2\2\2\u0185\u0187\5\u009eP\2\u0186\u0185\3\2\2\2\u0186"+
		"\u0187\3\2\2\2\u0187\u0188\3\2\2\2\u0188\u0189\7\37\2\2\u0189\u018a\5"+
		"\u00a2R\2\u018a\u018c\7\16\2\2\u018b\u018d\5,\27\2\u018c\u018b\3\2\2\2"+
		"\u018c\u018d\3\2\2\2\u018d\u0192\3\2\2\2\u018e\u018f\7\17\2\2\u018f\u0191"+
		"\5,\27\2\u0190\u018e\3\2\2\2\u0191\u0194\3\2\2\2\u0192\u0190\3\2\2\2\u0192"+
		"\u0193\3\2\2\2\u0193\u0195\3\2\2\2\u0194\u0192\3\2\2\2\u0195\u0196\7\20"+
		"\2\2\u0196/\3\2\2\2\u0197\u01a0\7\25\2\2\u0198\u019d\5\62\32\2\u0199\u019a"+
		"\7\17\2\2\u019a\u019c\5\62\32\2\u019b\u0199\3\2\2\2\u019c\u019f\3\2\2"+
		"\2\u019d\u019b\3\2\2\2\u019d\u019e\3\2\2\2\u019e\u01a1\3\2\2\2\u019f\u019d"+
		"\3\2\2\2\u01a0\u0198\3\2\2\2\u01a0\u01a1\3\2\2\2\u01a1\u01a2\3\2\2\2\u01a2"+
		"\u01a3\7\26\2\2\u01a3\61\3\2\2\2\u01a4\u01a6\5> \2\u01a5\u01a7\5F$\2\u01a6"+
		"\u01a5\3\2\2\2\u01a6\u01a7\3\2\2\2\u01a7\u01a9\3\2\2\2\u01a8\u01aa\5\u00a2"+
		"R\2\u01a9\u01a8\3\2\2\2\u01a9\u01aa\3\2\2\2\u01aa\63\3\2\2\2\u01ab\u01b4"+
		"\7\25\2\2\u01ac\u01b1\5\66\34\2\u01ad\u01ae\7\17\2\2\u01ae\u01b0\5\66"+
		"\34\2\u01af\u01ad\3\2\2\2\u01b0\u01b3\3\2\2\2\u01b1\u01af\3\2\2\2\u01b1"+
		"\u01b2\3\2\2\2\u01b2\u01b5\3\2\2\2\u01b3\u01b1\3\2\2\2\u01b4\u01ac\3\2"+
		"\2\2\u01b4\u01b5\3\2\2\2\u01b5\u01b6\3\2\2\2\u01b6\u01b7\7\26\2\2\u01b7"+
		"\65\3\2\2\2\u01b8\u01ba\5> \2\u01b9\u01bb\7k\2\2\u01ba\u01b9\3\2\2\2\u01ba"+
		"\u01bb\3\2\2\2\u01bb\u01bd\3\2\2\2\u01bc\u01be\5\u00a2R\2\u01bd\u01bc"+
		"\3\2\2\2\u01bd\u01be\3\2\2\2\u01be\67\3\2\2\2\u01bf\u01c8\7\25\2\2\u01c0"+
		"\u01c5\5:\36\2\u01c1\u01c2\7\17\2\2\u01c2\u01c4\5:\36\2\u01c3\u01c1\3"+
		"\2\2\2\u01c4\u01c7\3\2\2\2\u01c5\u01c3\3\2\2\2\u01c5\u01c6\3\2\2\2\u01c6"+
		"\u01c9\3\2\2\2\u01c7\u01c5\3\2\2\2\u01c8\u01c0\3\2\2\2\u01c8\u01c9\3\2"+
		"\2\2\u01c9\u01ca\3\2\2\2\u01ca\u01cb\7\26\2\2\u01cb9\3\2\2\2\u01cc\u01ce"+
		"\5> \2\u01cd\u01cf\5F$\2\u01ce\u01cd\3\2\2\2\u01ce\u01cf\3\2\2\2\u01cf"+
		";\3\2\2\2\u01d0\u01d2\5> \2\u01d1\u01d3\5F$\2\u01d2\u01d1\3\2\2\2\u01d2"+
		"\u01d3\3\2\2\2\u01d3\u01d4\3\2\2\2\u01d4\u01d5\5\u00a2R\2\u01d5=\3\2\2"+
		"\2\u01d6\u01d7\b \1\2\u01d7\u01dc\5h\65\2\u01d8\u01dc\5@!\2\u01d9\u01dc"+
		"\5B\"\2\u01da\u01dc\5D#\2\u01db\u01d6\3\2\2\2\u01db\u01d8\3\2\2\2\u01db"+
		"\u01d9\3\2\2\2\u01db\u01da\3\2\2\2\u01dc\u01e5\3\2\2\2\u01dd\u01de\f\4"+
		"\2\2\u01de\u01e0\7 \2\2\u01df\u01e1\5j\66\2\u01e0\u01df\3\2\2\2\u01e0"+
		"\u01e1\3\2\2\2\u01e1\u01e2\3\2\2\2\u01e2\u01e4\7!\2\2\u01e3\u01dd\3\2"+
		"\2\2\u01e4\u01e7\3\2\2\2\u01e5\u01e3\3\2\2\2\u01e5\u01e6\3\2\2\2\u01e6"+
		"?\3\2\2\2\u01e7\u01e5\3\2\2\2\u01e8\u01ed\5\u00a2R\2\u01e9\u01ea\7\"\2"+
		"\2\u01ea\u01ec\5\u00a2R\2\u01eb\u01e9\3\2\2\2\u01ec\u01ef\3\2\2\2\u01ed"+
		"\u01eb\3\2\2\2\u01ed\u01ee\3\2\2\2\u01eeA\3\2\2\2\u01ef\u01ed\3\2\2\2"+
		"\u01f0\u01f1\7#\2\2\u01f1\u01f2\7\25\2\2\u01f2\u01f3\5h\65\2\u01f3\u01f4"+
		"\7$\2\2\u01f4\u01f5\5> \2\u01f5\u01f6\7\26\2\2\u01f6C\3\2\2\2\u01f7\u01f8"+
		"\7\34\2\2\u01f8\u01fe\58\35\2\u01f9\u01fd\7l\2\2\u01fa\u01fd\7j\2\2\u01fb"+
		"\u01fd\5H%\2\u01fc\u01f9\3\2\2\2\u01fc\u01fa\3\2\2\2\u01fc\u01fb\3\2\2"+
		"\2\u01fd\u0200\3\2\2\2\u01fe\u01fc\3\2\2\2\u01fe\u01ff\3\2\2\2\u01ff\u0203"+
		"\3\2\2\2\u0200\u01fe\3\2\2\2\u0201\u0202\7\35\2\2\u0202\u0204\58\35\2"+
		"\u0203\u0201\3\2\2\2\u0203\u0204\3\2\2\2\u0204E\3\2\2\2\u0205\u0206\t"+
		"\5\2\2\u0206G\3\2\2\2\u0207\u0208\t\6\2\2\u0208I\3\2\2\2\u0209\u020d\7"+
		"\16\2\2\u020a\u020c\5L\'\2\u020b\u020a\3\2\2\2\u020c\u020f\3\2\2\2\u020d"+
		"\u020b\3\2\2\2\u020d\u020e\3\2\2\2\u020e\u0210\3\2\2\2\u020f\u020d\3\2"+
		"\2\2\u0210\u0211\7\20\2\2\u0211K\3\2\2\2\u0212\u021e\5P)\2\u0213\u021e"+
		"\5R*\2\u0214\u021e\5V,\2\u0215\u021e\5J&\2\u0216\u021e\5X-\2\u0217\u021e"+
		"\5Z.\2\u0218\u021e\5\\/\2\u0219\u021e\5^\60\2\u021a\u021e\5`\61\2\u021b"+
		"\u021e\5b\62\2\u021c\u021e\5T+\2\u021d\u0212\3\2\2\2\u021d\u0213\3\2\2"+
		"\2\u021d\u0214\3\2\2\2\u021d\u0215\3\2\2\2\u021d\u0216\3\2\2\2\u021d\u0217"+
		"\3\2\2\2\u021d\u0218\3\2\2\2\u021d\u0219\3\2\2\2\u021d\u021a\3\2\2\2\u021d"+
		"\u021b\3\2\2\2\u021d\u021c\3\2\2\2\u021eM\3\2\2\2\u021f\u0220\5j\66\2"+
		"\u0220\u0221\7\4\2\2\u0221O\3\2\2\2\u0222\u0223\7\'\2\2\u0223\u0224\7"+
		"\25\2\2\u0224\u0225\5j\66\2\u0225\u0226\7\26\2\2\u0226\u0229\5L\'\2\u0227"+
		"\u0228\7(\2\2\u0228\u022a\5L\'\2\u0229\u0227\3\2\2\2\u0229\u022a\3\2\2"+
		"\2\u022aQ\3\2\2\2\u022b\u022c\7)\2\2\u022c\u022d\7\25\2\2\u022d\u022e"+
		"\5j\66\2\u022e\u022f\7\26\2\2\u022f\u0230\5L\'\2\u0230S\3\2\2\2\u0231"+
		"\u0234\5d\63\2\u0232\u0234\5N(\2\u0233\u0231\3\2\2\2\u0233\u0232\3\2\2"+
		"\2\u0234U\3\2\2\2\u0235\u0236\7\31\2\2\u0236\u0239\7\25\2\2\u0237\u023a"+
		"\5T+\2\u0238\u023a\7\4\2\2\u0239\u0237\3\2\2\2\u0239\u0238\3\2\2\2\u023a"+
		"\u023c\3\2\2\2\u023b\u023d\5j\66\2\u023c\u023b\3\2\2\2\u023c\u023d\3\2"+
		"\2\2\u023d\u023e\3\2\2\2\u023e\u0240\7\4\2\2\u023f\u0241\5j\66\2\u0240"+
		"\u023f\3\2\2\2\u0240\u0241\3\2\2\2\u0241\u0242\3\2\2\2\u0242\u0243\7\26"+
		"\2\2\u0243\u0244\5L\'\2\u0244W\3\2\2\2\u0245\u0247\7*\2\2\u0246\u0248"+
		"\7s\2\2\u0247\u0246\3\2\2\2\u0247\u0248\3\2\2\2\u0248\u0249\3\2\2\2\u0249"+
		"\u024a\5v<\2\u024aY\3\2\2\2\u024b\u024c\7+\2\2\u024c\u024d\5L\'\2\u024d"+
		"\u024e\7)\2\2\u024e\u024f\7\25\2\2\u024f\u0250\5j\66\2\u0250\u0251\7\26"+
		"\2\2\u0251\u0252\7\4\2\2\u0252[\3\2\2\2\u0253\u0254\7i\2\2\u0254\u0255"+
		"\7\4\2\2\u0255]\3\2\2\2\u0256\u0257\7g\2\2\u0257\u0258\7\4\2\2\u0258_"+
		"\3\2\2\2\u0259\u025b\7,\2\2\u025a\u025c\5j\66\2\u025b\u025a\3\2\2\2\u025b"+
		"\u025c\3\2\2\2\u025c\u025d\3\2\2\2\u025d\u025e\7\4\2\2\u025ea\3\2\2\2"+
		"\u025f\u0260\7-\2\2\u0260\u0261\7\4\2\2\u0261c\3\2\2\2\u0262\u0263\7."+
		"\2\2\u0263\u0266\5f\64\2\u0264\u0266\5<\37\2\u0265\u0262\3\2\2\2\u0265"+
		"\u0264\3\2\2\2\u0266\u0269\3\2\2\2\u0267\u0268\7\27\2\2\u0268\u026a\5"+
		"j\66\2\u0269\u0267\3\2\2\2\u0269\u026a\3\2\2\2\u026a\u026b\3\2\2\2\u026b"+
		"\u026c\7\4\2\2\u026ce\3\2\2\2\u026d\u0274\7\25\2\2\u026e\u0270\5\u00a2"+
		"R\2\u026f\u026e\3\2\2\2\u026f\u0270\3\2\2\2\u0270\u0271\3\2\2\2\u0271"+
		"\u0273\7\17\2\2\u0272\u026f\3\2\2\2\u0273\u0276\3\2\2\2\u0274\u0272\3"+
		"\2\2\2\u0274\u0275\3\2\2\2\u0275\u0278\3\2\2\2\u0276\u0274\3\2\2\2\u0277"+
		"\u0279\5\u00a2R\2\u0278\u0277\3\2\2\2\u0278\u0279\3\2\2\2\u0279\u027a"+
		"\3\2\2\2\u027a\u027b\7\26\2\2\u027bg\3\2\2\2\u027c\u027d\t\7\2\2\u027d"+
		"i\3\2\2\2\u027e\u027f\b\66\1\2\u027f\u0280\7\65\2\2\u0280\u0291\5> \2"+
		"\u0281\u0282\7\25\2\2\u0282\u0283\5j\66\2\u0283\u0284\7\26\2\2\u0284\u0291"+
		"\3\2\2\2\u0285\u0286\t\b\2\2\u0286\u0291\5j\66\25\u0287\u0288\t\t\2\2"+
		"\u0288\u0291\5j\66\24\u0289\u028a\t\n\2\2\u028a\u0291\5j\66\23\u028b\u028c"+
		"\7:\2\2\u028c\u0291\5j\66\22\u028d\u028e\7;\2\2\u028e\u0291\5j\66\21\u028f"+
		"\u0291\5l\67\2\u0290\u027e\3\2\2\2\u0290\u0281\3\2\2\2\u0290\u0285\3\2"+
		"\2\2\u0290\u0287\3\2\2\2\u0290\u0289\3\2\2\2\u0290\u028b\3\2\2\2\u0290"+
		"\u028d\3\2\2\2\u0290\u028f\3\2\2\2\u0291\u02cd\3\2\2\2\u0292\u0293\f\20"+
		"\2\2\u0293\u0294\7<\2\2\u0294\u02cc\5j\66\21\u0295\u0296\f\17\2\2\u0296"+
		"\u0297\t\13\2\2\u0297\u02cc\5j\66\20\u0298\u0299\f\16\2\2\u0299\u029a"+
		"\t\t\2\2\u029a\u02cc\5j\66\17\u029b\u029c\f\r\2\2\u029c\u029d\t\f\2\2"+
		"\u029d\u02cc\5j\66\16\u029e\u029f\f\f\2\2\u029f\u02a0\7A\2\2\u02a0\u02cc"+
		"\5j\66\r\u02a1\u02a2\f\13\2\2\u02a2\u02a3\7\5\2\2\u02a3\u02cc\5j\66\f"+
		"\u02a4\u02a5\f\n\2\2\u02a5\u02a6\7B\2\2\u02a6\u02cc\5j\66\13\u02a7\u02a8"+
		"\f\t\2\2\u02a8\u02a9\t\r\2\2\u02a9\u02cc\5j\66\n\u02aa\u02ab\f\b\2\2\u02ab"+
		"\u02ac\t\16\2\2\u02ac\u02cc\5j\66\t\u02ad\u02ae\f\7\2\2\u02ae\u02af\7"+
		"E\2\2\u02af\u02cc\5j\66\b\u02b0\u02b1\f\6\2\2\u02b1\u02b2\7F\2\2\u02b2"+
		"\u02cc\5j\66\7\u02b3\u02b4\f\5\2\2\u02b4\u02b5\7G\2\2\u02b5\u02b6\5j\66"+
		"\2\u02b6\u02b7\7H\2\2\u02b7\u02b8\5j\66\6\u02b8\u02cc\3\2\2\2\u02b9\u02ba"+
		"\f\4\2\2\u02ba\u02bb\t\17\2\2\u02bb\u02cc\5j\66\5\u02bc\u02bd\f\33\2\2"+
		"\u02bd\u02cc\t\b\2\2\u02be\u02bf\f\31\2\2\u02bf\u02c0\7 \2\2\u02c0\u02c1"+
		"\5j\66\2\u02c1\u02c2\7!\2\2\u02c2\u02cc\3\2\2\2\u02c3\u02c4\f\30\2\2\u02c4"+
		"\u02c5\7\25\2\2\u02c5\u02c6\5t;\2\u02c6\u02c7\7\26\2\2\u02c7\u02cc\3\2"+
		"\2\2\u02c8\u02c9\f\27\2\2\u02c9\u02ca\7\"\2\2\u02ca\u02cc\5\u00a2R\2\u02cb"+
		"\u0292\3\2\2\2\u02cb\u0295\3\2\2\2\u02cb\u0298\3\2\2\2\u02cb\u029b\3\2"+
		"\2\2\u02cb\u029e\3\2\2\2\u02cb\u02a1\3\2\2\2\u02cb\u02a4\3\2\2\2\u02cb"+
		"\u02a7\3\2\2\2\u02cb\u02aa\3\2\2\2\u02cb\u02ad\3\2\2\2\u02cb\u02b0\3\2"+
		"\2\2\u02cb\u02b3\3\2\2\2\u02cb\u02b9\3\2\2\2\u02cb\u02bc\3\2\2\2\u02cb"+
		"\u02be\3\2\2\2\u02cb\u02c3\3\2\2\2\u02cb\u02c8\3\2\2\2\u02cc\u02cf\3\2"+
		"\2\2\u02cd\u02cb\3\2\2\2\u02cd\u02ce\3\2\2\2\u02cek\3\2\2\2\u02cf\u02cd"+
		"\3\2\2\2\u02d0\u02d8\7`\2\2\u02d1\u02d8\5\u00a0Q\2\u02d2\u02d8\7d\2\2"+
		"\u02d3\u02d8\7s\2\2\u02d4\u02d8\5\u00a2R\2\u02d5\u02d8\5\u009aN\2\u02d6"+
		"\u02d8\5\u009cO\2\u02d7\u02d0\3\2\2\2\u02d7\u02d1\3\2\2\2\u02d7\u02d2"+
		"\3\2\2\2\u02d7\u02d3\3\2\2\2\u02d7\u02d4\3\2\2\2\u02d7\u02d5\3\2\2\2\u02d7"+
		"\u02d6\3\2\2\2\u02d8m\3\2\2\2\u02d9\u02de\5j\66\2\u02da\u02db\7\17\2\2"+
		"\u02db\u02dd\5j\66\2\u02dc\u02da\3\2\2\2\u02dd\u02e0\3\2\2\2\u02de\u02dc"+
		"\3\2\2\2\u02de\u02df\3\2\2\2\u02dfo\3\2\2\2\u02e0\u02de\3\2\2\2\u02e1"+
		"\u02e6\5r:\2\u02e2\u02e3\7\17\2\2\u02e3\u02e5\5r:\2\u02e4\u02e2\3\2\2"+
		"\2\u02e5\u02e8\3\2\2\2\u02e6\u02e4\3\2\2\2\u02e6\u02e7\3\2\2\2\u02e7\u02ea"+
		"\3\2\2\2\u02e8\u02e6\3\2\2\2\u02e9\u02eb\7\17\2\2\u02ea\u02e9\3\2\2\2"+
		"\u02ea\u02eb\3\2\2\2\u02ebq\3\2\2\2\u02ec\u02ed\5\u00a2R\2\u02ed\u02ee"+
		"\7H\2\2\u02ee\u02ef\5j\66\2\u02efs\3\2\2\2\u02f0\u02f2\7\16\2\2\u02f1"+
		"\u02f3\5p9\2\u02f2\u02f1\3\2\2\2\u02f2\u02f3\3\2\2\2\u02f3\u02f4\3\2\2"+
		"\2\u02f4\u02f9\7\20\2\2\u02f5\u02f7\5n8\2\u02f6\u02f5\3\2\2\2\u02f6\u02f7"+
		"\3\2\2\2\u02f7\u02f9\3\2\2\2\u02f8\u02f0\3\2\2\2\u02f8\u02f6\3\2\2\2\u02f9"+
		"u\3\2\2\2\u02fa\u02fe\7\16\2\2\u02fb\u02fd\5x=\2\u02fc\u02fb\3\2\2\2\u02fd"+
		"\u0300\3\2\2\2\u02fe\u02fc\3\2\2\2\u02fe\u02ff\3\2\2\2\u02ff\u0301\3\2"+
		"\2\2\u0300\u02fe\3\2\2\2\u0301\u0302\7\20\2\2\u0302w\3\2\2\2\u0303\u0315"+
		"\5\u00a2R\2\u0304\u0315\5v<\2\u0305\u0315\5z>\2\u0306\u0315\5~@\2\u0307"+
		"\u0315\5\u0080A\2\u0308\u0315\5\u0086D\2\u0309\u0315\5\u0088E\2\u030a"+
		"\u0315\5\u008aF\2\u030b\u0315\5\u008eH\2\u030c\u0315\5\u0092J\2\u030d"+
		"\u0315\5\u0094K\2\u030e\u0315\7g\2\2\u030f\u0315\7i\2\2\u0310\u0315\5"+
		"\u0098M\2\u0311\u0315\5\u00a0Q\2\u0312\u0315\7s\2\2\u0313\u0315\7d\2\2"+
		"\u0314\u0303\3\2\2\2\u0314\u0304\3\2\2\2\u0314\u0305\3\2\2\2\u0314\u0306"+
		"\3\2\2\2\u0314\u0307\3\2\2\2\u0314\u0308\3\2\2\2\u0314\u0309\3\2\2\2\u0314"+
		"\u030a\3\2\2\2\u0314\u030b\3\2\2\2\u0314\u030c\3\2\2\2\u0314\u030d\3\2"+
		"\2\2\u0314\u030e\3\2\2\2\u0314\u030f\3\2\2\2\u0314\u0310\3\2\2\2\u0314"+
		"\u0311\3\2\2\2\u0314\u0312\3\2\2\2\u0314\u0313\3\2\2\2\u0315y\3\2\2\2"+
		"\u0316\u0319\5|?\2\u0317\u0319\5\u0096L\2\u0318\u0316\3\2\2\2\u0318\u0317"+
		"\3\2\2\2\u0319{\3\2\2\2\u031a\u031f\7,\2\2\u031b\u031f\7/\2\2\u031c\u031f"+
		"\7\62\2\2\u031d\u031f\5\u00a2R\2\u031e\u031a\3\2\2\2\u031e\u031b\3\2\2"+
		"\2\u031e\u031c\3\2\2\2\u031e\u031d\3\2\2\2\u031f\u032c\3\2\2\2\u0320\u0322"+
		"\7\25\2\2\u0321\u0323\5z>\2\u0322\u0321\3\2\2\2\u0322\u0323\3\2\2\2\u0323"+
		"\u0328\3\2\2\2\u0324\u0325\7\17\2\2\u0325\u0327\5z>\2\u0326\u0324\3\2"+
		"\2\2\u0327\u032a\3\2\2\2\u0328\u0326\3\2\2\2\u0328\u0329\3\2\2\2\u0329"+
		"\u032b\3\2\2\2\u032a\u0328\3\2\2\2\u032b\u032d\7\26\2\2\u032c\u0320\3"+
		"\2\2\2\u032c\u032d\3\2\2\2\u032d}\3\2\2\2\u032e\u032f\7S\2\2\u032f\u0332"+
		"\5\u0082B\2\u0330\u0331\7T\2\2\u0331\u0333\5z>\2\u0332\u0330\3\2\2\2\u0332"+
		"\u0333\3\2\2\2\u0333\177\3\2\2\2\u0334\u0335\5\u0082B\2\u0335\u0336\7"+
		"T\2\2\u0336\u0337\5z>\2\u0337\u0081\3\2\2\2\u0338\u033e\5\u00a2R\2\u0339"+
		"\u033a\7\25\2\2\u033a\u033b\5\u0084C\2\u033b\u033c\7\26\2\2\u033c\u033e"+
		"\3\2\2\2\u033d\u0338\3\2\2\2\u033d\u0339\3\2\2\2\u033e\u0083\3\2\2\2\u033f"+
		"\u0344\5\u00a2R\2\u0340\u0341\7\17\2\2\u0341\u0343\5\u00a2R\2\u0342\u0340"+
		"\3\2\2\2\u0343\u0346\3\2\2\2\u0344\u0342\3\2\2\2\u0344\u0345\3\2\2\2\u0345"+
		"\u0085\3\2\2\2\u0346\u0344\3\2\2\2\u0347\u0348\7U\2\2\u0348\u0349\5\u00a2"+
		"R\2\u0349\u0087\3\2\2\2\u034a\u034b\5\u00a2R\2\u034b\u034c\7H\2\2\u034c"+
		"\u0089\3\2\2\2\u034d\u034e\7V\2\2\u034e\u0352\5z>\2\u034f\u0351\5\u008c"+
		"G\2\u0350\u034f\3\2\2\2\u0351\u0354\3\2\2\2\u0352\u0350\3\2\2\2\u0352"+
		"\u0353\3\2\2\2\u0353\u008b\3\2\2\2\u0354\u0352\3\2\2\2\u0355\u0356\7W"+
		"\2\2\u0356\u0357\5\u0096L\2\u0357\u0358\5v<\2\u0358\u035c\3\2\2\2\u0359"+
		"\u035a\7X\2\2\u035a\u035c\5v<\2\u035b\u0355\3\2\2\2\u035b\u0359\3\2\2"+
		"\2\u035c\u008d\3\2\2\2\u035d\u035e\7\34\2\2\u035e\u035f\5\u00a2R\2\u035f"+
		"\u0361\7\25\2\2\u0360\u0362\5\u0084C\2\u0361\u0360\3\2\2\2\u0361\u0362"+
		"\3\2\2\2\u0362\u0363\3\2\2\2\u0363\u0365\7\26\2\2\u0364\u0366\5\u0090"+
		"I\2\u0365\u0364\3\2\2\2\u0365\u0366\3\2\2\2\u0366\u0367\3\2\2\2\u0367"+
		"\u0368\5v<\2\u0368\u008f\3\2\2\2\u0369\u036a\7Y\2\2\u036a\u036b\5\u0084"+
		"C\2\u036b\u0091\3\2\2\2\u036c\u036f\7\31\2\2\u036d\u0370\5v<\2\u036e\u0370"+
		"\5z>\2\u036f\u036d\3\2\2\2\u036f\u036e\3\2\2\2\u0370\u0371\3\2\2\2\u0371"+
		"\u0374\5z>\2\u0372\u0375\5v<\2\u0373\u0375\5z>\2\u0374\u0372\3\2\2\2\u0374"+
		"\u0373\3\2\2\2\u0375\u0376\3\2\2\2\u0376\u0377\5v<\2\u0377\u0093\3\2\2"+
		"\2\u0378\u0379\7\'\2\2\u0379\u037a\5z>\2\u037a\u037b\5v<\2\u037b\u0095"+
		"\3\2\2\2\u037c\u037d\t\20\2\2\u037d\u0097\3\2\2\2\u037e\u037f\7*\2\2\u037f"+
		"\u0380\5\u00a2R\2\u0380\u0381\5v<\2\u0381\u0099\3\2\2\2\u0382\u0384\7"+
		"\25\2\2\u0383\u0385\5j\66\2\u0384\u0383\3\2\2\2\u0384\u0385\3\2\2\2\u0385"+
		"\u038c\3\2\2\2\u0386\u0388\7\17\2\2\u0387\u0389\5j\66\2\u0388\u0387\3"+
		"\2\2\2\u0388\u0389\3\2\2\2\u0389\u038b\3\2\2\2\u038a\u0386\3\2\2\2\u038b"+
		"\u038e\3\2\2\2\u038c\u038a\3\2\2\2\u038c\u038d\3\2\2\2\u038d\u038f\3\2"+
		"\2\2\u038e\u038c\3\2\2\2\u038f\u039d\7\26\2\2\u0390\u0399\7 \2\2\u0391"+
		"\u0396\5j\66\2\u0392\u0393\7\17\2\2\u0393\u0395\5j\66\2\u0394\u0392\3"+
		"\2\2\2\u0395\u0398\3\2\2\2\u0396\u0394\3\2\2\2\u0396\u0397\3\2\2\2\u0397"+
		"\u039a\3\2\2\2\u0398\u0396\3\2\2\2\u0399\u0391\3\2\2\2\u0399\u039a\3\2"+
		"\2\2\u039a\u039b\3\2\2\2\u039b\u039d\7!\2\2\u039c\u0382\3\2\2\2\u039c"+
		"\u0390\3\2\2\2\u039d\u009b\3\2\2\2\u039e\u039f\5h\65\2\u039f\u009d\3\2"+
		"\2\2\u03a0\u03a1\t\21\2\2\u03a1\u009f\3\2\2\2\u03a2\u03a4\t\22\2\2\u03a3"+
		"\u03a5\7c\2\2\u03a4\u03a3\3\2\2\2\u03a4\u03a5\3\2\2\2\u03a5\u00a1\3\2"+
		"\2\2\u03a6\u03a7\t\23\2\2\u03a7\u00a3\3\2\2\2k\u00a7\u00a9\u00b7\u00bb"+
		"\u00c0\u00c7\u00cd\u00d3\u00d7\u00e3\u00eb\u00ee\u00f8\u00fb\u0101\u010d"+
		"\u0112\u011b\u011e\u0124\u012a\u0133\u0141\u0144\u0149\u014e\u0155\u0158"+
		"\u015b\u015f\u0164\u0168\u0173\u0175\u0179\u017f\u0186\u018c\u0192\u019d"+
		"\u01a0\u01a6\u01a9\u01b1\u01b4\u01ba\u01bd\u01c5\u01c8\u01ce\u01d2\u01db"+
		"\u01e0\u01e5\u01ed\u01fc\u01fe\u0203\u020d\u021d\u0229\u0233\u0239\u023c"+
		"\u0240\u0247\u025b\u0265\u0269\u026f\u0274\u0278\u0290\u02cb\u02cd\u02d7"+
		"\u02de\u02e6\u02ea\u02f2\u02f6\u02f8\u02fe\u0314\u0318\u031e\u0322\u0328"+
		"\u032c\u0332\u033d\u0344\u0352\u035b\u0361\u0365\u036f\u0374\u0384\u0388"+
		"\u038c\u0396\u0399\u039c\u03a4";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}